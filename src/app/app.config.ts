import {
  APP_INITIALIZER,
  ApplicationConfig,
  inject,
  provideAppInitializer,
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
import { AuraBaseDesignTokens } from '@primeuix/themes/aura/base';
import { Preset } from '@primeuix/themes/types';
import { loggingInterceptor } from './core/interceptors/logging.interceptor';
import { AuthService } from './features/auth/services/auth.service';
import { authReqInterceptor } from './features/auth/interceptors/auth-req.interceptor';
import { Theme } from './core/enums/Theme';
import { IAppConfig } from './core/interfaces/IAppConfig';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { LanguageService } from './features/language/services/language.service';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { IThemeState } from './core/interfaces/IThemeState';
import { DATE_FORMAT_TOKEN } from './core/tokens/date-format-token';
import { APP_CONFIG_TOKEN } from './core/tokens/app-config.token';

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
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: '/i18n/',
        suffix: '.json'
      }),
      fallbackLang: 'en',
      lang: 'en'
    }),
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
    },
    provideAppInitializer(() => {
      const languageService: LanguageService = inject(LanguageService);
      languageService.init();
    })
  ],
};
