import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { HeroSectionComponent } from './components/home/hero-section/hero-section.component';
import { AppRoutingModule } from '../app-routing.module';
import { OurPartnerComponent } from './components/home/our-partner/our-partner.component';
import { OurPlanComponent } from './components/home/our-plan/our-plan.component';
import { TopProductsComponent } from './components/home/top-products/top-products.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    HeroSectionComponent,
    OurPartnerComponent,
    OurPlanComponent,
    TopProductsComponent,
  ],
  imports: [CommonModule, AppRoutingModule, HttpClientModule],
  exports: [NavbarComponent, FooterComponent],
})
export class SharedModule {}
