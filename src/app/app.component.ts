import { Component } from '@angular/core';
import './training';
import { Color } from '../enums/Color';
import { Collection } from '../collection';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  
  public tours: Collection<string> = new Collection<string>();
  public prices: Collection<number> = new Collection<number>();
  public companyName: string = 'Румтибет';
  
  constructor() {
    this.setLastVisit();
    this.visitCount();
    
    this.tours.replace(0, 'Поход в горы');
    this.prices.replace(0, 1000);
  }
  
  isPrimaryColor(color: Color): boolean {
    const primaryColors: Color[] = [Color.RED, Color.BLUE, Color.GREEN];
    return primaryColors.includes(color);
  }
  
  setLastVisit(): void {
    const currentDate: string = new Date().toLocaleString();
    localStorage.setItem('last-visit', currentDate);
  }
  
  visitCount(): void {
    const storageVisitCount: string | null = localStorage.getItem('visit-count');
    const currentCount: number = storageVisitCount ? parseInt(storageVisitCount) : 0;
    const newCount: number = currentCount + 1;
    localStorage.setItem('visit-count', newCount.toString());
  }
  
}