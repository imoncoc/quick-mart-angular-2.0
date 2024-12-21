import { Injectable } from '@angular/core';
import { TUser } from './user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private localStorageKey = 'loginCredential';

  isLoggedIn(): boolean {
    const credential = localStorage.getItem(this.localStorageKey);
    return credential !== null;
  }

  login(credentials: any): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(credentials));
  }

  logout(): void {
    localStorage.removeItem(this.localStorageKey);
  }

  getCredentials(): TUser | null {
    const credentials = localStorage.getItem(this.localStorageKey);
    return credentials ? JSON.parse(credentials) : null;
  }
}
