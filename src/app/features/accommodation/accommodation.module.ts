// src/app/features/accommodation/accommodation.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { AccommodationDetailsComponent } from './accommodation-details/accommodation-details.component';
import { HomeModule } from '../home/home.module';

@NgModule({
  declarations: [
    AccommodationDetailsComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule.forChild([
      { path: '', component: AccommodationDetailsComponent }
    ]),
    HomeModule
  ]
})
export class AccommodationModule { }