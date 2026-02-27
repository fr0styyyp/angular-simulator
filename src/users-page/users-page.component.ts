import { Component, inject } from '@angular/core';
import { MessageService } from '../app/message.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ICard } from '../app/interfaces/ICard';
import { IDestination } from '../app/interfaces/IDestination';
import { IBlog } from '../app/interfaces/IBlog';
import { IImpressionImage } from '../app/interfaces/IImpressionImage';

@Component({
  selector: 'app-users-page',
  imports: [FormsModule, CommonModule],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent {
}
