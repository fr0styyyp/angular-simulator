import { Component, inject } from '@angular/core';
import { MessageService } from '../app/message.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { IMessage } from '../app/interfaces/IMessage';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEnvelope, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-message',
  imports: [CommonModule, AsyncPipe, FontAwesomeModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent {
  
  messageService: MessageService = inject(MessageService);
  messages$: Observable<IMessage[]> = this.messageService.messages$;
  faEnvelope: IconDefinition = faEnvelope;
  faCircleXmark: IconDefinition = faCircleXmark;
  
}
