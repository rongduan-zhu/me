import {Injectable} from 'angular2/core';

const socket = require('../../js/socket').default;

export interface ChatMessage {
  body: string;
}

@Injectable()
export class ChatService {
  public dataStore: any;

  private channel: any;

  public constructor() {
    this.dataStore = {messages: []};
  }

  public initConnection() {
    socket.connect();

    this.channel = socket.channel('rooms:lobby', {});

    this.channel.join()
      .receive('error', () => { this.onErrorHandler(); });

    this.channel.on('new_user', () => { this.onJoinHandler(); });
    this.channel.on('new_message', (response: any) => this.onNewMessageHandler(response.body));
  }

  public pushMessage(message: ChatMessage) {
    this.channel.push('new_message', message);
  }

  private onJoinHandler() {
    this.onNewMessageHandler("Someone just joined. Let's say hi!");
  }

  private onErrorHandler() {
    this.onNewMessageHandler(
      'Ooops, something went wrong. You might want to refresh the page.'
    );
  }

  private onNewMessageHandler(newMessage: string) {
    this.dataStore.messages.push({date: new Date(), body: newMessage});
  }
}
