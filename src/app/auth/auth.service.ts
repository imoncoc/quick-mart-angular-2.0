import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
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

  private isProtectedRoute(route: string): boolean {
    const protectedRoutes = [
      '/cart/checkout',
      '/protected',
      '/user',
      '/cart/payment-success',
    ]; // Add all your protected routes here
    return protectedRoutes.some((protectedRoute) =>
      route.startsWith(protectedRoute)
    );
  }

  isLoggedIn(): boolean {
    return this.credentialsSubject.value !== null;
  }

  login(credentials: TUser, returnUrl: string = '/home'): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(credentials));
    this.credentialsSubject.next(credentials);
    this.router.navigate([returnUrl]);
    this.toastService.show('Login successful!', 'success');
  }

  logout(): void {
    localStorage.removeItem(this.localStorageKey);
    this.credentialsSubject.next(null); // Notify subscribers
    this.toastService.show('Logout successful!', 'success');

    const currentRoute = this.router.url; // Get the current route
    const isProtected = this.isProtectedRoute(currentRoute);

    if (isProtected) {
      // If on a protected route, redirect to login with returnUrl
      this.router.navigate(['/auth/login'], {
        queryParams: { returnUrl: currentRoute },
      });
    }
  }

  getCredentials(): TUser | null {
    return this.credentialsSubject.value;
  }

  getCredentialsObservable(): Observable<TUser | null> {
    return this.credentialsSubject.asObservable(); // Expose as observable
  }

  get isAuthenticated$(): Observable<boolean> {
    return this.credentialsSubject
      .asObservable()
      .pipe(map((credentials) => credentials !== null));
  }
}
