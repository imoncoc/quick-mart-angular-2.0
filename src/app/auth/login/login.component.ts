import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
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

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  constructor(
    private title: Title,
    private toastService: ToastService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Quick Mart | Login');

    const usersFromStorage = localStorage.getItem('users');
    if (usersFromStorage) {
      this.users = JSON.parse(usersFromStorage);
    }

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
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
        // Login successful!
        this.toastService.show('Login successful!', 'success');
        localStorage.setItem('loginCredential', JSON.stringify(matchingUser));
        // this.authService.loggedCredential = matchingUser;
        this.router.navigate(['/home']);
        // console.log(this.authService.loggedCredential);
        console.log(this.authService.getCredentials());
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
        return 'Password must contain at least one number and one letter.';
      } else if (passwordControl.errors['minlength']) {
        return `Password must be at least ${passwordControl.errors['minlength'].requiredLength} characters long.`;
      } else if (passwordControl.errors['maxlength']) {
        return `Password must be no more than ${passwordControl.errors['maxlength'].requiredLength} characters long.`;
      }
    }

    return ''; // No password error
  }
}
