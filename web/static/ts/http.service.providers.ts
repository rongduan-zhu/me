import {provide} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';

import {HttpService} from './http.service';
import {StorageService} from './storage.service';

export const HTTP_SERVICE_PROVIDERS: any[] = [
  provide(HttpService, {useClass: HttpService}),
  provide(StorageService, {useClass: StorageService})
].concat(HTTP_PROVIDERS);
