import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {provide} from 'angular2/core';

import {AppComponent} from './app.component';

bootstrap(AppComponent, [ROUTER_PROVIDERS, provide(Window, {useValue: window})]);
