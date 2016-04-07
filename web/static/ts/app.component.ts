import {Component} from 'angular2/core';

import {ChatComponent} from './chat/chat.component';

@Component({
  selector: 'ng2-app',
  directives: [ChatComponent],
  template: require('!!raw!../template/main.ng2.html')
})
export class AppComponent { };
