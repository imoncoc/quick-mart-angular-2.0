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
    console.log(this.authService.getCredentials());
    this.cartItemsCount = this.cartService.cartCount;
    this.cartService.onCartChange = () => {
      this.cartItemsCount = this.cartService.cartCount;
    };

    // this.userData = this.authService.getCredentials();

    // this.isUserLoggedIn = !!this.authService.getCredentials();

    // Subscribe to credential changes
    this.authSubscription = this.authService
      .getCredentialsObservable()
      .subscribe((userData) => {
        this.userData = userData;
        this.isUserLoggedIn = !!userData;
      });
  }

  // Replace with actual user email logic

  logout() {
    // Implement your logout functionality here
    console.log('User logged out');
    this.authService.logout();
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    this.authSubscription?.unsubscribe();
  }
}
