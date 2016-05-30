import {Component, OnInit} from '@angular/core';
import {Router, Routes, ROUTER_DIRECTIVES} from '@angular/router';

import {ChatComponent} from './chat/chat.component';
import {AuthComponent} from './auth/auth.component';
import {DataLoaderDirective} from './utils/data-loader.directive';

@Component({
  selector: 'ng2-app',
  directives: [ROUTER_DIRECTIVES, DataLoaderDirective],
  template: require('!!raw!../template/main.ng2.html')
})
@Routes([
  {path: '/', component: ChatComponent},
  {path: '/login', component: AuthComponent}
])
export class AppComponent implements OnInit {
  public constructor(private router: Router) {}

  public ngOnInit() {
    this.router.navigate(['/']);
  }
}
