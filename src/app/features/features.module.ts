import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from './auth/auth.module';
import { SearchModule } from './search/search.module';
import { AccommodationModule } from './accommodation/accommodation.module';
import { BookingModule } from './booking/booking.module';
import { UserModule } from './user/user.module';
import { HomeModule } from './home/home.module';

@NgModule({
  imports: [
    CommonModule,
    AuthModule,
    SearchModule,
    AccommodationModule,
    BookingModule,
    UserModule,
    HomeModule
  ],
  exports: [
    AuthModule,
    SearchModule,
    AccommodationModule,
    BookingModule,
    UserModule,
    HomeModule
  ]
})
export class FeaturesModule { }