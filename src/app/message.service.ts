import { Injectable } from '@angular/core';
import { IMessage } from './interfaces/IMessage';
import { Message } from '../enums/Message';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  
  private messages: IMessage[] = [];
  
  closeMessage(message: IMessage): void {
    this.messages = this.messages.filter(m => m !== message);
  }
  
  showWarn(text: string): void {
    this.addMessage(text, Message.WARN);
  }
  
  showError(text: string): void {
    this.addMessage(text, Message.ERROR);
  }
  
  showSuccess(text: string): void {
    this.addMessage(text, Message.SUCCESS);
  }
  
  showInfo(text: string): void {
    this.addMessage(text, Message.INFO);
  }
  
  get allMessages(): IMessage[] {
    return this.messages;
  }
  
  private addMessage(text: string, type: Message): void {
    const newMessage: IMessage = { text, type };
    
    this.messages = [newMessage, ...this.messages];
    
    setTimeout(() => {
      this.closeMessage(newMessage);
    }, 5000);
  }
  
}