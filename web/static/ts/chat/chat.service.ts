import {Injectable} from 'angular2/core';

import {AuthService} from '../auth/auth.service';

const socket = require('../../js/socket').default;

export interface ChatMessage {
  body: string;
}

@Injectable()
export class ChatService {
  public dataStore: any;

  private channel: any;

  public constructor(private authService: AuthService) {
    this.dataStore = {messages: []};
  }

  public initConnection() {
    socket.connect();

    this.channel = socket.channel('rooms:lobby', {jwt: this.authService.authorizationToken()});

    this.channel.join()
      .receive('error', response => { this.onErrorHandler(response); });

    this.channel.on('new_user', () => { this.onJoinHandler(); });
    this.channel.on('new_message', (response: any) => this.onNewMessageHandler(response.body));
  }

  public pushMessage(message: ChatMessage) {
    this.channel.push('new_message', message);
  }

  private onJoinHandler() {
    this.onNewMessageHandler("Someone just joined. Let's say hi!");
  }

  private onErrorHandler(response) {
    switch (response) {
      case 'no_token':
        this.authService.unauthorized();
        break;
      default:
        console.warn(response);
        this.onNewMessageHandler(
          'Ooops, something went wrong. You might want to refresh the page.'
        );
    }
  }

  private onNewMessageHandler(newMessage: string) {
    this.dataStore.messages.push({date: new Date(), body: newMessage});
  }
}
