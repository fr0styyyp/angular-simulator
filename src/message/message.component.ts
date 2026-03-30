import { Component, inject } from '@angular/core';
import { MessageService } from '../app/message.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { IMessage } from '../app/interfaces/IMessage';

@Component({
  selector: 'app-message',
  imports: [CommonModule, AsyncPipe],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent {
  
  messageService: MessageService = inject(MessageService);
  messages$: Observable<IMessage[]> = this.messageService.messages$;
  
}
