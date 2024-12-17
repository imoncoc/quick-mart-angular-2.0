import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  loggedIn: boolean = true;
  canActivate() {
    if (this.loggedIn) {
      return true;
    } else {
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
  constructor(private router: Router) {}

  login() {
    this.loggedIn = true;
  }

  logout() {
    this.loggedIn = false;
  }
}
