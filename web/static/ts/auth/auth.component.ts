import {Component} from 'angular2/core';

import {FacebookService} from './facebook.service';
import {AuthService} from './auth.service';
import {HTTP_SERVICE_PROVIDERS} from '../http.service.providers';

@Component({
  selector: 'login',
  providers: [FacebookService, HTTP_SERVICE_PROVIDERS, AuthService],
  template: require('!!raw!../../template/auth/login.ng2.html')
})
export class AuthComponent {
  public constructor(private facebook: FacebookService) { }

  public fbLogin() {
    this.facebook.login();
  }
}
