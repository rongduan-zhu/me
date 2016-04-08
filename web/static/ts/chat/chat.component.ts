import {Component, OnInit} from 'angular2/core';

import {ChatService} from './chat.service';

@Component({
  selector: 'chat-app',
  providers: [ChatService],
  template: require('!!raw!../../template/chat/chat.ng2.html')
})
export class ChatComponent implements OnInit {
  public dataStore: string[];

  public newMessage: string;

  public constructor(private chatService: ChatService) { }

  public ngOnInit() {
    this.chatService.initConnection();
    this.newMessage = '';
    this.dataStore = this.chatService.dataStore;
  }

  public sendMessage() {
    this.chatService.pushMessage({body: this.newMessage});
    this.cleanup();
  }

  public keyEventHandler(event: any) {
    if (event.ctrlKey && event.charCode == 10) { this.sendMessage(); }
  }

  public cleanup() {
    this.newMessage = '';
  }
}
