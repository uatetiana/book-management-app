import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  setItem<T>(key: string, data: Book[]): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
