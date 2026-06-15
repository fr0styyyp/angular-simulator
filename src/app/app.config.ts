import { APP_INITIALIZER, ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Nora from '@primeuix/themes/nora';
import { Theme } from '../enums/Theme';
import { ThemeState } from './interfaces/IThemeState';
import { AuraBaseDesignTokens } from '@primeuix/themes/aura/base';
import { Preset } from '@primeuix/themes/types';
import { loggingInterceptor } from './interceptors/logging.interceptor';
import { errorInterceptor } from './interceptors/error.interceptor';
import { AuthService } from './features/auth/services/auth.service';
import { authReqInterceptor } from './features/auth/interceptors/auth-req.interceptor';

function getInitialPreset(): Preset<AuraBaseDesignTokens> {
  const savedData: string | null = localStorage.getItem('app-theme-settings');
  
  if (!savedData) {
    return Aura;
  }

  const state: ThemeState = JSON.parse(savedData) as ThemeState;
  const themesMap: Record<Theme, Preset<AuraBaseDesignTokens>> = {
    [Theme.AURA]: Aura,
    [Theme.LARA]: Lara,
    [Theme.NORA]: Nora
  };

  return themesMap[state.theme] ?? Aura;
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideZoneChangeDetection(),
    provideHttpClient(withInterceptors([authReqInterceptor, loggingInterceptor, errorInterceptor])),
    providePrimeNG({
      theme: {
        preset: getInitialPreset(),
        options: {
          darkModeSelector: '.my-app-dark'
        }
      }
    }),
    {
      provide: APP_INITIALIZER,
      useFactory: (authService: AuthService) => () => authService.initializeApp(),
      deps: [AuthService],
      multi: true
    }
  ]
};
