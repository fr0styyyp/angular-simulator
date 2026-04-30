import { inject, Injectable } from '@angular/core';
import { Mode, Theme, ThemeState } from './interfaces/IThemeState';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { PrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Nora from '@primeuix/themes/nora';
import { usePreset } from '@primeuix/themes';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  
  PrimeNG: PrimeNG = inject(PrimeNG);
  
  private defaultState: ThemeState = {
    mode: 'light',
    theme: 'aura'
  }
  
  private stateSubject: BehaviorSubject<ThemeState> = new BehaviorSubject<ThemeState>(this.defaultState);
  state$: Observable<ThemeState> = this.stateSubject.asObservable();
  
  private readonly STORAGE_KEY: string = 'app-theme-settings';
  private readonly themes = {
    aura: Aura,
    lara: Lara,
    nora: Nora
  };
  
  constructor() {
    const savedState = this.loadFromStorage();
    this.stateSubject.next(savedState);
    this.state$.pipe(
      tap((state: ThemeState) => {
        this.applyMode(state.mode);
        this.saveToStorage(state);
        usePreset(this.themes[state.theme]);
      })
    ).subscribe();
  }
  
  applyMode(mode: Mode): void {
    const host: HTMLElement = document.documentElement;
    if (mode === 'dark') {
      host.classList.add('my-app-dark');
    } else {
      host.classList.remove('my-app-dark');
    }
  }
  
  toggleMode(): void {
    const currentState: ThemeState = this.stateSubject.value;
    const newMode: Mode = currentState.mode === 'light' ? 'dark' : 'light';
    const newState: ThemeState = { ...currentState, mode: newMode };
    this.stateSubject.next(newState);
  }
  
  setTheme(themeName: Theme): void {
    const currentTheme: ThemeState = this.stateSubject.getValue();
    const newTheme: ThemeState = { ...currentTheme, theme: themeName };
    this.stateSubject.next(newTheme);
  }
  
  private saveToStorage(state: ThemeState): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(state));
  }
  
  private loadFromStorage(): ThemeState {
    const currentState: string | null = localStorage.getItem(this.STORAGE_KEY);
    
    if (currentState) {
      return JSON.parse(currentState);
    } else {
      return this.defaultState;
    }
  }
  
}
