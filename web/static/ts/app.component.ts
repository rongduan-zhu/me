import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {ChatComponent} from './chat/chat.component';
import {AuthComponent} from './auth/auth.component';
import {DataLoaderDirective} from './utils/data-loader.directive';

@Component({
  selector: 'ng2-app',
  directives: [ROUTER_DIRECTIVES, DataLoaderDirective],
  template: require('!!raw!../template/main.ng2.html')
})
@RouteConfig([
  {path: '/', name: 'Chat', component: ChatComponent},
  {path: '/login', name: 'Login', component: AuthComponent}
])
export class AppComponent { }
