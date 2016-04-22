import {Injectable} from 'angular2/core';

import {OAuthService} from './auth.service';

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

  public constructor(private authService: OAuthService, private window: Window) {
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
  }

  public login() {
    console.log('facebook#login');
    console.log(this.window.FB);
    this.window.FB.getLoginStatus(response => {
      console.log('well, this didnt happen');
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
}
