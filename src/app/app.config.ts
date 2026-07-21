import {
  APP_INITIALIZER,
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Nora from '@primeuix/themes/nora';
import { IThemeState } from './interfaces/IThemeState';
import { AuraBaseDesignTokens } from '@primeuix/themes/aura/base';
import { Preset } from '@primeuix/themes/types';
import { loggingInterceptor } from './interceptors/logging.interceptor';
import { errorInterceptor } from './interceptors/error.interceptor';
import { AuthService } from './features/auth/services/auth.service';
import { authReqInterceptor } from './features/auth/interceptors/auth-req.interceptor';
import { Theme } from '../enums/Theme';
import { DATE_FORMAT_TOKEN } from './tokens/date-format-token';
import { APP_CONFIG_TOKEN } from './tokens/app-config.token';
import { IAppConfig } from './interfaces/IAppConfig';

function getInitialPreset(): Preset<AuraBaseDesignTokens> {
  const savedData: string | null = localStorage.getItem('app-theme-settings');

  if (!savedData) {
    return Aura;
  }

  const state: IThemeState = JSON.parse(savedData) as IThemeState;
  const themesMap: Record<Theme, Preset<AuraBaseDesignTokens>> = {
    [Theme.AURA]: Aura,
    [Theme.LARA]: Lara,
    [Theme.NORA]: Nora,
  };

  return themesMap[state.theme] ?? Aura;
}

const appConfigValue: IAppConfig = {
  companyName: 'Румтибет',
  enableLogs: false,
  enableNotifications: true,
  enableTheming: true,
  sessionTimeout: 30,
};

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
          darkModeSelector: '.my-app-dark',
        },
      },
    }),
    {
      provide: APP_INITIALIZER,
      useFactory: (authService: AuthService) => () => authService.initializeApp(),
      deps: [AuthService],
      multi: true,
    },
    {
      provide: DATE_FORMAT_TOKEN,
      useValue: 'dd.mm.yyyy hh:mm'
    },
    {
      provide: APP_CONFIG_TOKEN,
      useValue: appConfigValue
    }
  ],
};
