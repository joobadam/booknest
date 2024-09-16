import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { HomeComponent } from './home.component';
import { HeroComponent } from './components/hero/hero.component';
import { AccommodationCarouselComponent } from './components/accommodation-carousel/accommodation-carousel.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { CtaComponent } from './components/cta/cta.component';
import { FeaturedAccommodationsComponent } from './components/featured-accommodations/featured-accommodations.component';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    HomeComponent,
    HeroComponent,
    AccommodationCarouselComponent,
    TestimonialsComponent,
    CtaComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    FeaturedAccommodationsComponent,
    MatIconModule
  ],
  exports: [HomeComponent, FeaturedAccommodationsComponent]
})
export class HomeModule { }