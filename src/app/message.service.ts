import { Injectable } from '@angular/core';
import { IMessage } from './interfaces/IMessage';
import { Message } from '../enums/Message';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messages: IMessage[] = [];
  
  addMessage(text: string, type: Message) {
    const newMessage: IMessage = { text, type };
    
    this.messages = [newMessage, ...this.messages];
    
    setTimeout(() => {
      this.closeMessage(newMessage);
    }, 5000);
  }
  
  closeMessage(message: IMessage) {
    this.messages = this.messages.filter((m) => m !== message);
  }
  
  get allMessages(): IMessage[] {
    return this.messages;
  }
}