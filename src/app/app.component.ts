import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ToastComponent } from './shared/components/toast/toast.component';
import { ToastService } from './shared/toast.service';
import { AuthService } from './auth/auth.service';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild(ToastComponent) toastComponent!: ToastComponent;
  title = 'quick-mart-angular-2';

  constructor(
    private toastService: ToastService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      const currentRoute = this.router.url;

      if (!isAuthenticated && this.isProtectedRoute(currentRoute)) {
        // Redirect only if the route is protected
        this.router.navigate(['/auth/login'], {
          queryParams: { returnUrl: currentRoute },
        });
      }
    });

    // Subscribe to route changes for debugging
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        console.log('Navigating to:', event.url);
      }
    });
  }

  // Helper method to check if the current route is protected
  private isProtectedRoute(route: string): boolean {
    const protectedRoutes = [
      '/cart/checkout',
      '/protected',
      '/user',
      '/cart/payment-success',
    ]; // Add all protected routes here

    return protectedRoutes.some((protectedRoute) =>
      route.startsWith(protectedRoute)
    );
  }

  ngAfterViewInit(): void {
    this.toastService.registerToastComponent(this.toastComponent);
  }
}
