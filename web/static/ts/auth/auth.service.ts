import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {HttpService} from '../http.service';
import {StorageService} from '../storage.service';

@Injectable()
export class OAuthService {
  private usersPath = '/api/users';

  public constructor(private http: HttpService, private storage: StorageService) { }

  public loginOrSignup(data: any): Observable<string> {
    data.token = true;

    return this.http.post(this.usersPath, JSON.stringify(data))
      .map(response => this.processJwt(response))
      .catch(this.handleError);
  }

  private processJwt(response: any) {
    let payload = JSON.parse(response._body);
    this.storage.put('jwt', payload.jwt);
    return response;
  }

  private handleError(error: any) {
    console.warn(error);

    return Observable.throw(error);
  }
}
