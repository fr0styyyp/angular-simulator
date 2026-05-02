import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Nora from '@primeuix/themes/nora';
import { Theme } from '../enums/theme';
import { ThemeState } from './interfaces/IThemeState';

function getInitialPreset() {
  const savedData = localStorage.getItem('app-theme-settings');
  if (savedData) {
    try {
      const state = JSON.parse(savedData) as ThemeState;
      if (state.theme === Theme.Lara) return Lara;
      if (state.theme === Theme.Nora) return Nora;
    } catch (e) {
      
    }
  }
  return Aura;
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideZoneChangeDetection(),
    providePrimeNG({
      theme: {
        preset: getInitialPreset(),
        options: {
          darkModeSelector: '.my-app-dark'
        }
      }
    })
  ]
};
