import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { AuthService } from 'src/app/auth/auth.service';
import { CartService } from '../../services/cart.service';
import { TUser } from 'src/app/auth/user.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  isNavLinkOpen: boolean = false; // Use a descriptive variable name
  cartItemsCount: number = 0;
  userData: TUser | null | undefined;
  isUserLoggedIn: boolean = false;
  private authSubscription: Subscription | null = null;

  toggleNavLink() {
    this.isNavLinkOpen = !this.isNavLinkOpen;
  }

  constructor(
    private authService: AuthService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.cartItemsCount = this.cartService.cartCount;
    this.cartService.onCartChange = () => {
      this.cartItemsCount = this.cartService.cartCount;
    };

    this.authSubscription = this.authService
      .getCredentialsObservable()
      .subscribe((userData) => {
        this.userData = userData;
        this.isUserLoggedIn = !!userData;
      });
  }

  logout() {
    console.log('User logged out');
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }
}
