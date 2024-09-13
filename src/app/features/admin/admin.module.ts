import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AddEditAccommodationComponent } from './add-edit-accommodation/add-edit-accommodation.component';

const routes: Routes = [
  { path: '', component: AdminDashboardComponent },
  { path: 'add-accommodation', component: AddEditAccommodationComponent },
  { path: 'edit-accommodation/:id', component: AddEditAccommodationComponent },
];

@NgModule({
  declarations: [AdminDashboardComponent, AddEditAccommodationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class AdminModule { }