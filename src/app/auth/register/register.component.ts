import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { matchValidator } from '../form-validators';
import { ToastComponent } from 'src/app/shared/components/toast/toast.component';
import { ToastService } from 'src/app/shared/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @ViewChild(ToastComponent) toast!: ToastComponent;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  registerForm!: FormGroup;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  constructor(private title: Title, private toastService: ToastService) {}

  ngOnInit(): void {
    this.title.setTitle('Quick Mart | Signup');

    this.registerForm = new FormGroup({
      fullname: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25),
        matchValidator('confirmPassword', true),
      ]),
      confirmPassword: new FormControl(null, [
        Validators.required,
        matchValidator('password'),
      ]),
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      this.toastService.show('Operation was successful!', 'success');
      this.registerForm.reset();
    } else {
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

    return ''; // No password error
  }
}
