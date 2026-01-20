import { Component } from '@angular/core';
import './training';
import { Color } from '../enums/color';
import { Collection } from '../collection';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor() {
    this.setLastVisit();
    this.setVisitCount();
  }
  
  companyName: string = 'РУМТИБЕТ'
  
  isPrimaryColor(color: Color): boolean {
    if (color === Color.Red || color === Color.Blue || color === Color.Green) {
      return true
    } else {
      return false
    }
  }
  
  setLastVisit() {
    const currentDate = new Date().toLocaleString()
    localStorage.setItem('lastVisit', currentDate)
  }
  
  setVisitCount() {
    const visitCountString = localStorage.getItem('visitCount');
    const currentCount = visitCountString ? parseInt(visitCountString) : 0;
    const newCount = currentCount + 1;
    localStorage.setItem('visitCount', newCount.toString())
  }
}

const tours = new Collection<String>();
const prices = new Collection<Number>();

tours.replace(0, 'Поход в горы');
prices.replace(0, 1000);