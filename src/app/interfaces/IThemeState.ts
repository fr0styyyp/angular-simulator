export type Mode = 'light' | 'dark';
export type Theme = 'aura' | 'lara' | 'nora'

export interface ThemeState {
  mode: Mode;
  theme: Theme;
}