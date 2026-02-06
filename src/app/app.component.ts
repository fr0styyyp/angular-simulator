import { Component } from '@angular/core';
import './training';
import { Color } from '../enums/Color';
import { Collection } from '../collection';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ICard } from './interfaces/ICard';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  
  readonly companyName: string = 'Румтибет';
  selectedDirection: string = '';
  selectedDate: string = '';
  participantsCount: number | null = null;
  tours: Collection<string> = new Collection<string>();
  prices: Collection<number> = new Collection<number>();
  currentDate: Date = new Date();
  counter: number = 0;
  isTimerVisible: boolean = true;
  liveTextInput: string = '';
  isLoading: boolean = true;
  
  cards: ICard[] = [
    {
      title: 'Опытный гид',
      text: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      icon: 'experienced-guide-icon'
    },
    {
      title: 'Безопасный поход',
      text: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      icon: 'armour-icon'
    },
    {
      title: 'Лояльные цены',
      text: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      icon: 'price-icon'
    }
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
  
  get isFormValid(): boolean {
    return !!(this.selectedDate && this.selectedDirection && this.participantsCount && this.participantsCount >= 4);
  }
  
  get formattedDate(): string {
    return this.currentDate.toLocaleString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).replace(',', '');
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
    localStorage.setItem('last-visit', currentDate);
  }
  
  private updateVisitCount(): void {
    const storageVisitCount: string | null = localStorage.getItem('visit-count');
    const currentCount: number = storageVisitCount ? parseInt(storageVisitCount) : 0;
    const newCount: number = currentCount + 1;
    localStorage.setItem('visit-count', newCount.toString());
  }
  
}