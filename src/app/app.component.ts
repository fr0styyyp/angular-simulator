import { Component } from '@angular/core';
import './training';
import { Color } from '../enums/Color';
import { Collection } from '../collection';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface ICard {
  title: string;
  text: string;
  icon: string;
}

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
  liveText: string = '';
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
    
    this.setLastVisit();
    this.visitCount();
    
    this.tours.replace(0, 'Поход в горы');
    this.prices.replace(0, 1000);
  }
  
  validateBookingForm(): boolean {
    return (
    !this.selectedDate ||
    !this.selectedDirection ||
    !this.participantsCount ||
    this.participantsCount < 4
    );
  }
  
  counterIncrement(): void {
    this.counter++;
  }
  
  counterDecrement(): void {
    if (this.counter > 0) {
      this.counter--;
    }
  }
  
  toggleHeaderFeature(): void {
    this.isTimerVisible = !this.isTimerVisible;
  }
  
  private isPrimaryColor(color: Color): boolean {
    const primaryColors: Color[] = [Color.RED, Color.BLUE, Color.GREEN];
    return primaryColors.includes(color);
  }
  
  private setLastVisit(): void {
    const currentDate: string = new Date().toLocaleString();
    localStorage.setItem('last-visit', currentDate);
  }
  
  private visitCount(): void {
    const storageVisitCount: string | null = localStorage.getItem('visit-count');
    const currentCount: number = storageVisitCount ? parseInt(storageVisitCount) : 0;
    const newCount: number = currentCount + 1;
    localStorage.setItem('visit-count', newCount.toString());
  }
  
}