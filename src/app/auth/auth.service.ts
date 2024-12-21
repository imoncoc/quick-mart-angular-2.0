import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TUser } from './user.interface';
import { Router } from '@angular/router';
import { ToastService } from '../shared/toast.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private localStorageKey = 'loginCredential';
  private credentialsSubject: BehaviorSubject<TUser | null>;

  constructor(private router: Router, private toastService: ToastService) {
    const initialCredentials = this.getCredentialsFromStorage();
    this.credentialsSubject = new BehaviorSubject<TUser | null>(
      initialCredentials
    );
  }

  private getCredentialsFromStorage(): TUser | null {
    const credentials = localStorage.getItem(this.localStorageKey);
    return credentials ? JSON.parse(credentials) : null;
  }

  isLoggedIn(): boolean {
    return this.credentialsSubject.value !== null;
  }

  login(credentials: TUser): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(credentials));
    this.credentialsSubject.next(credentials);
    this.router.navigate(['/home']);
    this.toastService.show('Login successful!', 'success');
  }

  logout(): void {
    localStorage.removeItem(this.localStorageKey);
    this.credentialsSubject.next(null); // Notify subscribers
    this.toastService.show('Logout successful!', 'success');
  }

  getCredentials(): TUser | null {
    return this.credentialsSubject.value;
  }

  getCredentialsObservable(): Observable<TUser | null> {
    return this.credentialsSubject.asObservable(); // Expose as observable
  }
}
