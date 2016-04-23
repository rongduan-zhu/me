import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {provide} from 'angular2/core';

import {AppComponent} from './app.component';

bootstrap(AppComponent, [ROUTER_PROVIDERS, provide(Window, {useValue: window})]);

(function(d){
  let js;
  let id = 'facebook-jssdk';
  let ref = d.getElementsByTagName('script')[0];

  if (d.getElementById(id)) {
    return;
  }

  js = d.createElement('script');
  js.id = id;
  js.async = true;
  js.src = '//connect.facebook.net/en_US/sdk.js';

  ref.parentNode.insertBefore(js, ref);
}(document));
