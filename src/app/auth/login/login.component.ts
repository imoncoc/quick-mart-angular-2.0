import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/shared/toast.service';
import { AuthGuard } from '../auth.guard';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  showPassword: boolean = false;
  loginForm!: FormGroup;
  users: any[] = [];
  returnUrl: string = '/home';

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  constructor(
    private title: Title,
    private toastService: ToastService,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Quick Mart | Login');

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';

    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }

    const usersFromStorage = localStorage.getItem('users');
    if (usersFromStorage) {
      this.users = JSON.parse(usersFromStorage);
    }

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9-_?/]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25),
      ]),
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;

      const matchingUser = this.users.find(
        (user) =>
          (user.email === loginData.email &&
            user.password === loginData.password) ||
          (user.username === loginData.email &&
            user.password === loginData.password)
      );

      if (matchingUser) {
        const returnUrl =
          this.route.snapshot.queryParams['returnUrl'] || '/home';
        this.authService.login(matchingUser, this.returnUrl);
      } else {
        this.toastService.show('Invalid email/username or password!', 'error');
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

 

  getPasswordError() {
    const passwordControl = this.loginForm.get('password');

    if (passwordControl?.errors) {
      if (passwordControl.errors['required']) {
        return 'Password is required.';
      } else if (passwordControl.errors['pattern']) {
        return 'Password must contain at least one letter, one number, and may include -, _, ?, or /.';
      } else if (passwordControl.errors['minlength']) {
        return `Password must be at least ${passwordControl.errors['minlength'].requiredLength} characters long.`;
      } else if (passwordControl.errors['maxlength']) {
        return `Password must be no more than ${passwordControl.errors['maxlength'].requiredLength} characters long.`;
      }
    }

    return ''; // No password error
  }

}
