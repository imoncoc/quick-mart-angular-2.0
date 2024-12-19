import { Injectable } from '@angular/core';
import { ToastComponent } from './components/toast/toast.component';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastComponent!: ToastComponent;

  registerToastComponent(toastComponent: ToastComponent) {
    this.toastComponent = toastComponent;
  }

  show(message: string, type: 'success' | 'error' | 'info' | 'warn') {
    this.toastComponent?.showToast(message, type);
  }

  constructor() {}
}
