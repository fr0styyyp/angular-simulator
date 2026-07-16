import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DateFormatService {
  
  private readonly dateFormatSubject: BehaviorSubject<string> = new BehaviorSubject<string>('dd.mm.yyyy hh:mm');
  readonly dateFormat$: Observable<string> = this.dateFormatSubject.asObservable();
  
  setFormat(format: string): void {
    this.dateFormatSubject.next(format);
  }
  
  getCurrentFormat(): string {
    return this.dateFormatSubject.getValue();
  }
  
}
