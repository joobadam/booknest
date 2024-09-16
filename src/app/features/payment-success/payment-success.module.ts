import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { PaymentSuccessComponent } from './payment-success.component';

const routes: Routes = [
  { path: '', component: PaymentSuccessComponent }
];

@NgModule({
  declarations: [PaymentSuccessComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule
  ],
  exports: [PaymentSuccessComponent]
})
export class PaymentSuccessModule { }