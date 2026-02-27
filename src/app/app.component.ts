import { Component, inject } from '@angular/core';
import './training';
import { Color } from '../enums/Color';
import { Collection } from '../collection';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ICard } from './interfaces/ICard';
import { IDestination } from './interfaces/IDestination';
import { IBlog } from './interfaces/IBlog';
import { MessageService } from './message.service';
import { Message } from '../enums/Message';
import { LocalStorageService } from './local-storage.service';
import { IImpressionImage } from './interfaces/IImpressionImage';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule, RouterOutlet, HeaderComponent, FooterComponent, MessageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  
  messageService: MessageService = inject(MessageService);
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  
  messageType: typeof Message = Message;
  tours: Collection<string> = new Collection<string>();
  prices: Collection<number> = new Collection<number>();
  currentDate: Date = new Date();
  counter: number = 0;
  isLoading: boolean = true;
  
  constructor() {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
    
    this.setLastVisitDate();
    this.updateVisitCount();
    
    this.tours.replace(0, 'Поход в горы');
    this.prices.replace(0, 1000);
  }
  
  private isPrimaryColor(color: Color): boolean {
    const primaryColors: Color[] = [Color.RED, Color.BLUE, Color.GREEN];
    return primaryColors.includes(color);
  }
  
  private setLastVisitDate(): void {
    const currentDate: string = new Date().toLocaleString();
    this.localStorageService.setItem('last visit', currentDate);
  }
  
  private updateVisitCount(): void {
    const count: number = this.localStorageService.getItem<number>('visit count') || 0;
    this.localStorageService.setItem('visit count', count + 1);
  }
  
}