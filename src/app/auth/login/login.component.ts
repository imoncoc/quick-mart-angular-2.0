import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ToastService } from 'src/app/shared/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  showPassword: boolean = false;
  loginForm!: FormGroup;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  constructor(private title: Title, private toastService: ToastService) {}

  ngOnInit(): void {
    this.title.setTitle('Quick Mart | Login');

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.toastService.show('Operation was successful!', 'success');
      this.toastService.show('Operation was successful!', 'error');
      this.toastService.show('Operation was successful!', 'info');
      this.toastService.show('Operation was successful!', 'warn');
      this.loginForm.reset();
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
