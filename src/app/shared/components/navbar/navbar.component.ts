import { Component, OnInit } from '@angular/core';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { AuthService } from 'src/app/auth/auth.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isNavLinkOpen: boolean = false; // Use a descriptive variable name
  cartItemsCount: number = 0;

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
  }

  userEmail: string = 'user@example.com'; // Replace with actual user email logic

  logout() {
    // Implement your logout functionality here
    console.log('User logged out');
    this.authService.logout();
  }
}
