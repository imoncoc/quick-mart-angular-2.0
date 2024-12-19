import { Component, OnInit } from '@angular/core';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isNavLinkOpen: boolean = false; // Use a descriptive variable name
  cartItemsCount: number = 3;

  toggleNavLink() {
    this.isNavLinkOpen = !this.isNavLinkOpen;
  }

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // console.log('AuthGuard: ', this.authGuard.loggedCredential);
    console.log(this.authService.getCredentials());
  }
}
