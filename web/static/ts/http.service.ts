import {Injectable} from 'angular2/core';
import {Http, Headers, RequestOptionsArgs} from 'angular2/http';

import {StorageService} from './storage.service';

declare var _: any;

@Injectable()
export class HttpService {
  public constructor(public http: Http, private storage: StorageService) { }

  public get(url: string, options?: RequestOptionsArgs) {
    return this.http.get(url, this.addHeaders(options));
  }

  public post(url: string, body: string, options?: RequestOptionsArgs) {

    return this.http.post(url, body, this.addHeaders(options));
  }

  private addHeaders(requestOptions?: RequestOptionsArgs) {
    let options = requestOptions || {headers: new Headers()};

    options.headers.append('Content-Type', 'application/json');
    options.headers.append('Authorization', this.storage.get('jwt'));

    return options;
  }
}
