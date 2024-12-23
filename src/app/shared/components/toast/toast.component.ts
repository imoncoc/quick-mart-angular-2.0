import { Component, Input, OnInit } from '@angular/core';

export interface Toast {
  message: string;
  type: 'success' | 'error' | 'info' | 'warn';
}

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent {
  toasts: Toast[] = [];

  showToast(message: string, type: 'success' | 'error' | 'info' | 'warn') {
    this.toasts.push({ message, type });
    setTimeout(() => this.toasts.shift(), 3000); // Auto-hide after 3 seconds
  }

  removeToast(index: number) {
    this.toasts.splice(index, 1);
  }

  getIconClass(type: string): string {
    switch (type) {
      case 'success':
        // return 'fa-solid fa-check';
        return '';
      case 'error':
        // return 'fa-solid fa-times';
        return '';
      case 'info':
        // return 'fa-solid fa-info';
        return '';
      case 'warn':
        // return 'fa-solid fa-exclamation';
        return '';
      default:
        return '';
    }
  }
}

// this.toastService.show('Operation was successful!', 'success');
//       this.toastService.show('Operation was successful!', 'error');
//       this.toastService.show('Operation was successful!', 'info');
//       this.toastService.show('Operation was successful!', 'warn');
