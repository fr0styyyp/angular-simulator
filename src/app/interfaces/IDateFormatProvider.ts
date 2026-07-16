import { Observable } from 'rxjs';

export interface IDateFormatProvider {
  readonly dateFormat$: Observable<string>;
  getCurrentFormat(): string;
  setFormat(format: string): void;
}