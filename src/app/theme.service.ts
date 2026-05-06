import { DestroyRef, inject, Injectable } from '@angular/core';
import { ThemeState } from './interfaces/IThemeState';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { usePreset } from '@primeuix/themes';
import AURA from '@primeuix/themes/aura';
import LARA from '@primeuix/themes/lara';
import NORA from '@primeuix/themes/nora';
import { Mode } from '../enums/Mode';
import { Theme } from '../enums/Theme';
import { SelectButtonChangeEvent } from 'primeng/selectbutton';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SelectOption } from './interfaces/ISelectOption';
import { Preset } from '@primeuix/themes/types';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  
  private destroyRef: DestroyRef = inject(DestroyRef);
  
    stateOptions: SelectOption[] = [
      { label: 'Aura', value: Theme.AURA },
      { label: 'Lara', value: Theme.LARA },
      { label: 'Nora', value: Theme.NORA }
  ];
  
  private defaultState: ThemeState = {
    mode: Mode.LIGHT,
    theme: Theme.AURA
  }
  
  private stateSubject: BehaviorSubject<ThemeState> = new BehaviorSubject<ThemeState>(this.defaultState);
  state$: Observable<ThemeState> = this.stateSubject.asObservable();
  
  private readonly STORAGE_KEY: string = 'app-theme-settings';
  private readonly themes: Record<Theme, Preset> = {
    [Theme.AURA]: AURA,
    [Theme.LARA]: LARA,
    [Theme.NORA]: NORA
  };
  
  constructor() {
    const savedState: ThemeState = this.loadFromStorage();
    this.stateSubject.next(savedState);
    this.state$.pipe(
      takeUntilDestroyed(this.destroyRef),
      tap((state: ThemeState) => {
        this.saveToStorage(state);
        this.applyMode(state.mode);
        this.applyTheme(state.theme);
      })
    ).subscribe();
  }
  
  applyMode(mode: Mode): void {
    const host: HTMLElement = document.documentElement;
    if (mode === Mode.DARK) {
      host.classList.add('my-app-dark');
    } else {
      host.classList.remove('my-app-dark');
    }
  }
  
  toggleMode(): void {
    const currentState: ThemeState = this.stateSubject.value;
    const newMode: Mode = currentState.mode === Mode.LIGHT ? Mode.DARK : Mode.LIGHT;
    const newState: ThemeState = { ...currentState, mode: newMode };
    this.stateSubject.next(newState);
  }
  
  setTheme(event: SelectButtonChangeEvent): void {
    const themeName: Theme = event.value;
    if (!themeName) {
      return;
    }
    
    const currentTheme: ThemeState = this.stateSubject.getValue();
    const newTheme: ThemeState = { ...currentTheme, theme: themeName };
    this.stateSubject.next(newTheme);
  }
  
  private applyTheme(theme: Theme): void {
    usePreset(this.themes[theme]);
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
