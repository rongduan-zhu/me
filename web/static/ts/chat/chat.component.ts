import {Component} from 'angular2/core';

@Component({
  selector: 'chat-app',
  template: require('!!raw!../../template/chat/chat.ng2.html')
})
export class ChatComponent {
  public messages: string[];

  public newMessage: string;

  public constructor() {
    this.newMessage = '';
    this.messages = [];
  }

  public sendMessage() {
    this.messages.push(this.newMessage);
    this.cleanup();
  }

  public keyEventHandler(event: any) {
    if (event.ctrlKey && event.charCode == 10) { this.sendMessage(); }
  }

  public cleanup() {
    this.newMessage = '';
  }
}
