import {Directive} from 'angular2/core';

import {StorageService} from '../storage.service';

declare var _: any;

@Directive({
  selector: 'data-loader',
  providers: [StorageService]
})
export class DataLoaderDirective {
  public constructor(private storage: StorageService) {
    let dataToLoad = document.querySelectorAll('me-data');

    _.forEach(dataToLoad, data => {
      let key = data.getAttribute('key');
      let value = data.getAttribute('value');

      if (!key || !value) {
        console.warn(`Key or value is missing. key: "${key}", value: "${value}"`);
        return;
      }

      this.storage.put(key, value);
    });
  }
}
