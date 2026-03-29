import { Component, inject } from '@angular/core';
import { MessageService } from '../app/message.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-message',
  imports: [CommonModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent {
  
  messageService: MessageService = inject(MessageService);
  messages$ = this.messageService.messages$;
  
}
