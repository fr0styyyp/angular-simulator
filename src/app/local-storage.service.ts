import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  
  setItem<T>(key: string, value: T): void {
    const stringValue: string = JSON.stringify(value);
    localStorage.setItem(key, stringValue);
  }
  
  getItem<T>(key: string): T | null {
    const data: string | null = localStorage.getItem(key);
    return data ? (JSON.parse(data) as T) : null;
  }
  
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
  
  clear(): void {
    localStorage.clear();
  }
  
}
