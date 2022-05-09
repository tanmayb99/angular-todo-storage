import { Inject, Injectable, InjectionToken } from '@angular/core';

const BROWSER_STORAGE_TOKEN = new InjectionToken<Storage>('Browser Storage', {
  providedIn: 'root',
  factory: () => localStorage,
});

@Injectable({
  providedIn: 'root',
})
export class StorageService implements Storage {
  constructor(@Inject(BROWSER_STORAGE_TOKEN) public storage: Storage) {}

  get length() {
    return this.storage.length;
  }

  key(index: number): string {
    return this.storage.key(index);
  }
  removeItem(key: string): void {
    this.storage.removeItem(key);
  }

  getItem(key: string) {
    return this.storage.getItem(key);
  }

  setItem(key: string, value: string): void {
    this.storage.setItem(key, value);
  }

  clear() {
    this.storage.clear();
  }
}
