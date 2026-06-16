import { Component, inject } from '@angular/core';
import './training';
import { Color } from '../enums/Color';
import { Collection } from '../collection';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Message } from '../enums/Message';
import { LocalStorageService } from './local-storage.service';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { MessageComponent } from '../message/message.component';
import { LoaderService } from './loader.service';
import { LoaderComponent } from "../loader/loader.component";
import { AuthService } from './features/auth/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule, RouterOutlet, HeaderComponent, FooterComponent, MessageComponent, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  loaderService: LoaderService = inject(LoaderService);
  authService: AuthService = inject(AuthService);
  
  messageType: typeof Message = Message;
  tours: Collection<string> = new Collection<string>();
  prices: Collection<number> = new Collection<number>();
  currentDate: Date = new Date();
  counter: number = 0;
  
  constructor() {
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