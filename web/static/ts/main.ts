///<reference path="../../node_modules/angular2/typings/browser.d.ts"/>

import {bootstrap} from 'angular2/platform/browser';
import {UpgradeAdapter} from 'angular2/upgrade';
import {AppComponent} from './app.component';

const upgradeAdapter = new UpgradeAdapter();

bootstrap(AppComponent);
upgradeAdapter.bootstrap(document.body, ['app']);
