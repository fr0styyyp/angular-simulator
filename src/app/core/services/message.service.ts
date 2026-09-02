import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IAppConfig } from '../interfaces/IAppConfig';
import { Message } from '../enums/Message';
import { IMessage } from '../interfaces/IMessage';
import { APP_CONFIG_TOKEN } from '../tokens/app-config.token';



@Injectable({
  providedIn: 'root',
})
export class MessageService {

  private messagesSubject: BehaviorSubject<IMessage[]> = new BehaviorSubject<IMessage[]>([]);
  messages$: Observable<IMessage[]> = this.messagesSubject.asObservable();

  private readonly appConfig: IAppConfig = inject(APP_CONFIG_TOKEN);
  
  closeMessage(message: IMessage): void {
    const updatedMessages: IMessage[] = this.messagesSubject
      .getValue()
      .filter((m: IMessage) => m !== message);
    this.messagesSubject.next(updatedMessages);
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
    if (!this.appConfig.enableNotifications) {
      return;
    }
    
    const newMessage: IMessage = { text, type };

    this.messagesSubject.next([newMessage, ...this.messagesSubject.getValue()]);

    setTimeout(() => {
      this.closeMessage(newMessage);
    }, 5000);
  }

}
