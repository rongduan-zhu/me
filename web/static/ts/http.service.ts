import {Injectable} from 'angular2/core';
import {Http, Headers, RequestOptionsArgs, Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/catch';

import {StorageService} from './storage.service';

declare var _: any;

@Injectable()
export class HttpService {
  public constructor(public http: Http, private storage: StorageService) { }

  public get(url: string, options?: RequestOptionsArgs) {
    return this.http.get(url, this.addHeaders(options))
      .catch(response => this.catchError(response));
  }

  public post(url: string, body: string, options?: RequestOptionsArgs) {
    return this.http.post(url, body, this.addHeaders(options))
      .catch(response => this.catchError(response));
  }

  private addHeaders(requestOptions?: RequestOptionsArgs) {
    let options = requestOptions || {headers: new Headers()};

    options.headers.append('Content-Type', 'application/json');
    options.headers.append('Authorization', this.storage.get('jwt'));

    return options;
  }

  private catchError(error: Response) {
    console.log(error);
    return Observable.throw(error);
  }
}
