import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { INavItem } from '../app/interfaces/INavItem';
import { ThemeService } from '../app/theme.service';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMoon, faSun, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { AsyncPipe } from '@angular/common';
import { AuthService } from '../app/features/auth/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, FontAwesomeModule, ToggleSwitch, FormsModule, SelectButtonModule, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  
  themeService: ThemeService = inject(ThemeService);
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);
  
  readonly companyName: string = 'Румтибет';
  currentDate: Date = new Date();
  counter: number = 0;
  isTimerVisible: boolean = true;
  liveTextInput: string = '';
  selectedDirection!: string;
  selectedDate!: string;
  participantsCount: number | null = null;
  faSun: IconDefinition = faSun;
  faMoon: IconDefinition = faMoon;
  
  navItems: INavItem[] = [
    { label: 'Главная', path: '/' },
    { label: 'Пользователи', path: '/users' },
    { label: 'Посты', path: '/posts' }
  ];
  
  constructor() {
    setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
  }
  
  logout(): void {
    this.authService.logout();
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
  
}
