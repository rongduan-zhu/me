import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {HttpService} from '../http.service';
import {StorageService} from '../storage.service';

@Injectable()
export class AuthService {
  private usersPath = '/api/users';

  public constructor(
    private http: HttpService,
    private router: Router,
    private storage: StorageService
  ) { }

  public loginOrSignup(data: any): Observable<string> {
    data.token = true;

    return this.http.post(this.usersPath, JSON.stringify(data))
      .map(response => this.processJwt(response));
  }

  public unauthorized() {
    this.router.navigate(['/login']);
  }

  public authorizationToken() {
    return this.storage.get('jwt');
  }

  private processJwt(response: any) {
    let payload = JSON.parse(response._body);
    this.storage.put('jwt', payload.jwt);

    this.router.navigate(['/']);

    return response;
  }
}
