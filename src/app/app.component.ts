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
  public companyName: string = 'РУМТИБЕТ';
  
  constructor() {
    this.setLastVisit();
    this.visitCount();
    
    this.tours.replace(0, 'Поход в горы');
    this.prices.replace(0, 1000);
  }
  
  isPrimaryColor(color: Color): boolean {
    return color === Color.RED || color === Color.BLUE || color === Color.GREEN;
  }
  
  setLastVisit(): void {
    const currentDate: string = new Date().toLocaleString();
    localStorage.setItem('lastVisit', currentDate);
  }
  
  visitCount(): void {
    const visitCountString: string | null = localStorage.getItem('visitCount');
    const currentCount: number = visitCountString ? parseInt(visitCountString) : 0;
    const newCount: number = currentCount + 1;
    localStorage.setItem('visitCount', newCount.toString());
  }
}