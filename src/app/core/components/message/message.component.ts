import { Component, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEnvelope, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { MessageService } from '../../../core/services/message.service';
import { IMessage } from '../../../core/interfaces/IMessage';

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
