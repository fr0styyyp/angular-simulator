import { Component } from '@angular/core';
import './training';
import { Color } from '../enums/Color';
import { Collection } from '../collection';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  
  public readonly companyName: string = 'Румтибет';
  public selectedDirection: string = '';
  public selectedDate: string = '';
  public participantsCount: number | null = null;
  public tours: Collection<string> = new Collection<string>();
  public prices: Collection<number> = new Collection<number>();
  public dataTime: Date = new Date();
  public counter: number = 0;
  public isTimerVisible: boolean = true;
  public liveText: string = '';
  public isLoading: boolean = true;
  
  public readonly cards = [
    {
      title: 'Опытный гид',
      text: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      icon: '/images/experienced-guide-icon.svg'
    },
    {
      title: 'Безопасный поход',
      text: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      icon: '/images/armour-icon.svg'
    },
    {
      title: 'Лояльные цены',
      text: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      icon: '/images/price-icon.svg'
    }
  ]
  
  constructor() {
    setInterval(() => {
      this.dataTime = new Date();
    }, 1000);
    
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
    
    this.setLastVisit();
    this.visitCount();
    
    this.tours.replace(0, 'Поход в горы');
    this.prices.replace(0, 1000);
  }
  
  public isFormInvalid(): boolean {
    return (
    !this.selectedDate ||
    !this.selectedDirection ||
    !this.participantsCount ||
    this.participantsCount < 4
    );
  }
  
  public increment(): void {
    this.counter++;
  }
  
  public decrement(): void {
    if (this.counter > 0) {
      this.counter--;
    }
  }
  
  public toggleDisplay(): void {
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