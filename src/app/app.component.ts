import { Component, inject } from '@angular/core';
import { Collection } from '../collection';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Message } from './core/enums/Message';
import { LocalStorageService } from './core/services/local-storage.service';
import { RouterOutlet } from '@angular/router';
import { MessageComponent } from './core/components/message/message.component';
import { LoaderService } from './core/services/loader.service';
import { AuthService } from './features/auth/services/auth.service';
import { Color } from './core/enums/Color';
import { ParentComponent } from '../sandbox/homework-28/parent/parent.component';
import { CdDefaultComponent } from '../sandbox/homework-28/cd-default/cd-default.component';
import { CdOnPushComponent } from '../sandbox/homework-28/cd-on-push/cd-on-push.component';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { LoaderComponent } from './core/components/loader/loader.component';

@Component({
  selector: 'app-root',
  imports: [
    FormsModule,
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    MessageComponent,
    LoaderComponent,
    ParentComponent,
    CdDefaultComponent,
    CdOnPushComponent
  ],
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
    const currentDate: string = new Date().toISOString();
    this.localStorageService.setItem('last visit', currentDate);
  }

  private updateVisitCount(): void {
    const count: number = this.localStorageService.getItem<number>('visit count') || 0;
    this.localStorageService.setItem('visit count', count + 1);
  }

}
