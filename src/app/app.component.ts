import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ToastComponent } from './shared/components/toast/toast.component';
import { ToastService } from './shared/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild(ToastComponent) toastComponent!: ToastComponent;
  title = 'quick-mart-angular-2';

  constructor(private toastService: ToastService) {}

  ngAfterViewInit(): void {
    this.toastService.registerToastComponent(this.toastComponent);
  }
}
