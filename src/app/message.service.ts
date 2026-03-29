import { Injectable } from '@angular/core';
import { IMessage } from './interfaces/IMessage';
import { Message } from '../enums/Message';
import { BehaviorSubject, filter, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  
  private messagesSubject: BehaviorSubject<IMessage[]> = new BehaviorSubject<IMessage[]>([]);
  messages$: Observable<IMessage[]> = this.messagesSubject.asObservable();
  
  
  closeMessage(message: IMessage): void {
    this.messagesSubject.next(
      this.messagesSubject.getValue()
        .filter((m: IMessage) => m !== message)
    );
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
  
  private addMessage(text: string, type: Message): void {
    const newMessage: IMessage = { text, type };
    
    this.messagesSubject.next([
      newMessage, 
      ...this.messagesSubject.getValue()
    ]);
    
    setTimeout(() => {
      this.closeMessage(newMessage);
    }, 5000);
  }
  
}