import {Injectable} from '@angular/core';

@Injectable()
export class StorageService {
  private defaultNamespace = 'me';

  private storage: any;

  public constructor(private window: Window) {
    this.storage = window.localStorage;
  }

  public put(key: string, value: string) {
    this.storage.setItem(this.getKey(key), value);
  }

  public get(key: string) {
    return this.storage.getItem(this.getKey(key));
  }

  public remove(key: string) {
    this.storage.removeItem(this.getKey(key));
  }

  private getKey(key: string) {
    return `${this.defaultNamespace}.${key}`;
  }
}
