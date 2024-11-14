import { Injectable } from '@angular/core';

/**
 * Simple service to persist data in the local storage
 */
@Injectable({
  providedIn: 'root'
})
export class PersistenceService {
  // Uses a prefix for all keys to avoid conflicts with third party libraries
  // increase version for breaking changes
  readonly prefix = 'kanban-app-v1';

  constructor() { }

  setItem(key: string, value: string) {
    localStorage.setItem(`${this.prefix}-${key}`, value);
  }

  getItem(key: string): string | null {
    return localStorage.getItem(`${this.prefix}-${key}`);
  }

  removeItem(key: string): void {
    localStorage.removeItem(`${this.prefix}-${key}`)
  }
}
