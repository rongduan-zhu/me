import {Injectable} from 'angular2/core';

import {AuthService} from './auth.service';

interface Window {
  fbAsyncInit?: any;
  FB?: any;
}

interface OAuthUser {
  userId?: string;
  accessToken?: string;
  loggedIn?: boolean;
  provider: string;
}

@Injectable()
export class FacebookService {
  public loggedIn: boolean;

  public user: OAuthUser;

  public constructor(private authService: AuthService, private window: Window) {
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: '1021824831234075',
        status: true,
        cookie: true,
        xfbml: true,
        version: 'v2.5'
      });
    };

    this.user = {provider: 'facebook'};

    this.loadFbAsync();
  }

  public login() {
    this.window.FB.getLoginStatus(response => {
      this.handleLoginResponse(response);
    });
  }

  private handleLoginResponse(response) {
    switch (response.status) {
      case 'connected':
        this.user.loggedIn = true;
        this.user.userId = response.authResponse.userID;
        this.user.accessToken = response.authResponse.accessToken;
        this.authService.loginOrSignup(this.user)
          .subscribe(
            success => console.log(success),
            error => console.log(error)
          );
        break;
      case 'unknown':
        this.window.FB.login(loginResponse => { this.handleLoginResponse(loginResponse); });
        break;
      default:
        console.error(response);
    }
  }

  private loadFbAsync() {
    let js;
    let id = 'facebook-jssdk';
    let ref = document.getElementsByTagName('script')[0];

    if (document.getElementById(id)) {
      return;
    }

    js = document.createElement('script');
    js.id = id;
    js.async = true;
    js.src = '//connect.facebook.net/en_US/sdk.js';

    ref.parentNode.insertBefore(js, ref);
  }
}
