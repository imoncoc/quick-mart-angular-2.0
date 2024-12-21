import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { TUser } from '../user.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { matchValidator } from '../form-validators';
import { ToastService } from 'src/app/shared/toast.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { stringify } from 'querystring';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  userData: TUser | undefined | null;
  registerForm!: FormGroup;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  users: any[] = [];
  private authSubscription: Subscription | null = null;

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Quick Mart | User Profile');
    this.userData = this.authService.getCredentials();
    this.registerForm = new FormGroup({
      fullname: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25),
        matchValidator('confirmPassword', true),
      ]),
      confirmPassword: new FormControl(null, [matchValidator('password')]),
    });

    this.authSubscription = this.authService
      .getCredentialsObservable()
      .subscribe((userData) => {
        this.userData = userData;

        if (userData) {
          // Populate form with user data
          this.registerForm.patchValue({
            fullname: userData.fullname || '',
            username: userData.username || '',
            email: userData.email || '',
          });
        }
      });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      let updatedData = this.registerForm.value;

      const currentData = this.authService.getCredentials();
      if (!currentData) {
        this.toastService.show('No user data found!', 'error');
        return;
      }

      updatedData = {
        ...currentData,
        fullname: updatedData.fullname || currentData.fullname,
        username: updatedData.username || currentData.username,
        email: updatedData.email || currentData.email,
        password: updatedData.password
          ? updatedData.password
          : currentData.password,
      };

      delete updatedData.confirmPassword;

      localStorage.setItem('loginCredential', JSON.stringify(updatedData));

      let usersArr = JSON.parse(localStorage.getItem('users') || '[]');
      const userIndex = usersArr.findIndex(
        (user: any) => user.id === currentData.id
      );

      if (userIndex !== -1) {
        usersArr[userIndex] = { ...usersArr[userIndex], ...updatedData };
        localStorage.setItem('users', JSON.stringify(usersArr));
        console.log('Updated usersArr: ', usersArr);
      } else {
        console.error('User not found in usersArr.');
      }

      this.toastService.show('Profile updated successfully!', 'success');
    } else {
      this.toastService.show('Please fill in all fields correctly!', 'error');
      this.registerForm.markAllAsTouched();
    }
  }

  getPasswordError() {
    const passwordControl = this.registerForm.get('password');

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

    return '';
  }
}
