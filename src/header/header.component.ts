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
import { AppDatePipe } from '../app/pipes/date.pipe';
import { LocalStorageService } from '../app/local-storage.service';
import { IAppConfig } from '../app/interfaces/IAppConfig';
import { APP_CONFIG_TOKEN } from '../app/tokens/app-config.token';
import { LanguageService } from '../app/features/language/language.service';
import { SelectModule } from 'primeng/select';
import { ILanguage } from '../app/features/language/ILanguage';
import { AVAILABLE_LANGUAGES, LANGUAGE_LABELS } from '../app/features/language/language.constants';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive,
    FontAwesomeModule,
    ToggleSwitch,
    FormsModule,
    SelectButtonModule,
    AsyncPipe,
    AppDatePipe,
    SelectModule,
    TranslatePipe
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  themeService: ThemeService = inject(ThemeService);
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);
  localStorageService: LocalStorageService = inject(LocalStorageService);
  appConfig: IAppConfig = inject(APP_CONFIG_TOKEN);
  languageService: LanguageService = inject(LanguageService);

  currentDate: Date = new Date();
  counter: number = 0;
  isTimerVisible: boolean = true;
  liveTextInput: string = '';
  selectedDirection!: string;
  selectedDate!: string;
  participantsCount: number | null = null;
  faSun: IconDefinition = faSun;
  faMoon: IconDefinition = faMoon;
  lastLoginDate: string | null = this.localStorageService.getItem<string>('last-visit');
  
  navItems: INavItem[] = [
    { label: 'header.nav.home', path: '/' },
    { label: 'header.nav.users', path: '/users' },
    { label: 'header.nav.posts', path: '/posts' },
  ];
  
  languages: ILanguage[] = AVAILABLE_LANGUAGES.map(lang => ({
    label: LANGUAGE_LABELS[lang],
    value: lang
  }));

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
