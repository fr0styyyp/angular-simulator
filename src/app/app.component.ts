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

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  
  readonly companyName: string = 'Румтибет';
  messageType = Message;
  messageService: MessageService = inject(MessageService);
  selectedDirection!: string;
  selectedDate!: string;
  participantsCount: number | null = null;
  tours: Collection<string> = new Collection<string>();
  prices: Collection<number> = new Collection<number>();
  currentDate: Date = new Date();
  counter: number = 0;
  isTimerVisible: boolean = true;
  liveTextInput: string = '';
  isLoading: boolean = true;
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  
  cards: ICard[] = [
    {
      title: 'Опытный гид',
      text: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      icon: 'experienced-guide-icon',
    },
    {
      title: 'Безопасный поход',
      text: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      icon: 'armour-icon',
    },
    {
      title: 'Лояльные цены',
      text: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      icon: 'price-icon',
    },
  ];
  
  destinations: IDestination[] = [
    {
      title: 'Озеро возле гор',
      description: 'романтическое приключение',
      price: '480 $',
      starIcon: 'star',
      rating: 4.9,
      imageUrl: 'lake',
    },
    {
      title: 'Ночь в горах',
      description: 'в компании друзей',
      price: '500 $',
      starIcon: 'star',
      rating: 4.5,
      imageUrl: 'winter-mountain',
    },
    {
      title: 'Йога в горах',
      description: 'для тех, кто забоится о себе',
      price: '230 $',
      starIcon: 'star',
      rating: 5.0,
      imageUrl: 'mountain-yoga',
    },
  ];
  
  blogs: IBlog[] = [
    {
      title: 'Красивая Италия, какая она в реальности?',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      date: '01/04/2023',
      link: 'читать статью',
      imageUrl: 'italy-mountain',
    },
    {
      title: 'Долой сомнения! Весь мир открыт для вас!',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации ... независимые способы реализации соответствующих...',
      date: '01/04/2023',
      link: 'читать статью',
      imageUrl: 'plane-view',
    },
    {
      title: 'Как подготовиться к путешествию в одиночку? ',
      description: 'Для современного мира базовый вектор развития предполагает.',
      date: '01/04/2023',
      link: 'читать статью',
      imageUrl: 'human-between-buildings',
    },
    {
      title: 'Индия ... летим?',
      description: 'Для современного мира базовый.',
      date: '01/04/2023',
      link: 'читать статью',
      imageUrl: 'mosque',
    },
  ];
  
  constructor() {
    setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
    
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
    
    this.setLastVisitDate();
    this.updateVisitCount();
    
    this.tours.replace(0, 'Поход в горы');
    this.prices.replace(0, 1000);
  }
  
  isFormValid(): boolean {
    return !!(
      this.selectedDate &&
      this.selectedDirection &&
      this.participantsCount &&
      this.participantsCount >= 4
    );
  }
  
  onIncrementCounter(): void {
    this.counter++;
  }
  
  onDecrementCounter(): void {
    if (this.counter > 0) {
      this.counter--;
    }
  }
  
  onToggleTimerVisibility(): void {
    this.isTimerVisible = !this.isTimerVisible;
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
    const count = this.localStorageService.getItem<number>('visit count') || 0;
    const newCount: number = count + 1;
    this.localStorageService.setItem('visit count', newCount);
  }
  
}