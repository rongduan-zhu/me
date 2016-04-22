import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class OAuthService {
  private usersPath = '/api/users';

  private static appendContentType(header: Headers) {
    header.append('Content-Type', 'application/json');
  }

  public constructor(private http: Http) { }

  public loginOrSignup(data: any): Observable<string> {
    let headers = new Headers();

    OAuthService.appendContentType(headers);

    data.token = true;

    return this.http.post(this.usersPath, JSON.stringify(data), { headers: headers })
      .map(this.processJwt)
      .catch(this.handleError);
  }

  private processJwt(response: any) {
    console.log(response);
    return response;
  }

  private handleError(error: any) {
    console.warn(error);

    return Observable.throw(error);
  }
}
