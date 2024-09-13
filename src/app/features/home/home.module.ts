import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { HomeComponent } from './home.component';
import { HeroComponent } from './components/hero/hero.component';
import { FeaturesComponent } from './components/features/features.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { CtaComponent } from './components/cta/cta.component';
import { AccommodationCarouselComponent } from './components/accommodation-carousel/accommodation-carousel.component';

@NgModule({
  declarations: [
    HomeComponent,
    HeroComponent,
    FeaturesComponent,
    TestimonialsComponent,
    CtaComponent,
    AccommodationCarouselComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [HomeComponent]
})
export class HomeModule { }