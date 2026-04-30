import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { INavItem } from '../app/interfaces/INavItem';
import { ThemeService } from '../app/theme.service';
import { Observable, tap } from 'rxjs';
import { ThemeState } from '../app/interfaces/IThemeState';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMoon, faSun, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';
import { SelectButtonChangeEvent, SelectButtonModule } from 'primeng/selectbutton';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, FontAwesomeModule, ToggleSwitch, FormsModule, SelectButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  
  ThemeService: ThemeService = inject(ThemeService);
  themeState$: Observable<ThemeState> = this.ThemeService.state$;
  
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
  checked!: boolean;
  currentTheme: string = 'aura';
  
  navItems: INavItem[] = [
    { label: 'Главная', path: '/' },
    { label: 'Пользователи', path: '/users' },
  ];
  
  stateOptions = [
    { label: 'Aura', value: 'aura' },
    { label: 'Lara', value: 'lara' },
    { label: 'Nora', value: 'nora' }
  ];
  
  constructor() {
    setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
    
    this.themeState$.pipe(
      tap((state: ThemeState) => {
        this.checked = state.mode === 'dark';
        this.currentTheme = state.theme;
      })
    ).subscribe();
  }
  
  onThemeChange(event: SelectButtonChangeEvent): void {
    this.ThemeService.setTheme(event.value)
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
