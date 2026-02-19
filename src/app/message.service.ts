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
    
    this.messages.unshift(newMessage);
    
    setTimeout(() => {
      this.closeMessage(this.messages.indexOf(newMessage));
    }, 5000);
  }
  
  closeMessage(index: number) {
    this.messages.splice(index, 1);
  }
  
  get allMessages(): IMessage[] {
    return this.messages;
  }
}