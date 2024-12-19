import { Injectable } from '@angular/core';

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

  getCredentials(): any {
    const credentials = localStorage.getItem(this.localStorageKey);
    return credentials ? JSON.parse(credentials) : null;
  }
}
