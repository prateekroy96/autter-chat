import { Injectable } from '@angular/core';
import { AppComponent } from './app.component';
import { LocalStorage } from './core/models/localStorage';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService implements Storage {
  private storage: Storage;
  constructor() {
    this.storage = new LocalStorage();
    AppComponent.isBrowser.subscribe((isBrowser) => {
      if (isBrowser) {
        this.storage = localStorage;
      }
    });
  }
  [name: string]: any;
  length: number;
  clear(): void {
    this.storage.clear();
  }
  getItem(key: string): string {
    return this.storage.getItem(key);
  }
  key(index: number): string {
    return this.storage.key(index);
  }
  removeItem(key: string): void {
    return this.storage.removeItem(key);
  }
  setItem(key: string, value: string): void {
    return this.storage.setItem(key, value);
  }
}
