import {Component} from 'angular2/core';
import {HTTP_PROVIDERS}    from 'angular2/http';

import {FacebookService} from './facebook.service';
import {OAuthService} from './auth.service';
import {HttpService} from '../http.service';
import {StorageService} from '../storage.service';

@Component({
  selector: 'login',
  providers: [FacebookService, HTTP_PROVIDERS, HttpService, OAuthService, StorageService],
  template: require('!!raw!../../template/auth/login.ng2.html')
})
export class AuthComponent {
  public constructor(private facebook: FacebookService) { }

  public fbLogin() {
    this.facebook.login();
  }
}
