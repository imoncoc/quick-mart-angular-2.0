import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { HeroSectionComponent } from './components/home/hero-section/hero-section.component';
import { AppRoutingModule } from '../app-routing.module';
import { ToastComponent } from './components/toast/toast.component';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    HeroSectionComponent,
  ],
  imports: [CommonModule, AppRoutingModule],
  exports: [NavbarComponent, FooterComponent],
})
export class SharedModule {}
