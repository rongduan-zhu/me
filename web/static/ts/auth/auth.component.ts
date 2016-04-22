import {Component} from 'angular2/core';
import { HTTP_PROVIDERS }    from 'angular2/http';

import {FacebookService} from './facebook.service';
import {OAuthService} from './auth.service';

@Component({
  selector: 'login',
  providers: [FacebookService, HTTP_PROVIDERS, OAuthService],
  template: require('!!raw!../../template/auth/login.ng2.html')
})
export class AuthComponent {
  public constructor(private facebook: FacebookService) { }

  public fbLogin() {
    console.log('clicked!');
    console.log(this.facebook);
    this.facebook.login();
  }
}
