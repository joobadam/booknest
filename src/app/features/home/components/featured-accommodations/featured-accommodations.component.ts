import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AccommodationService } from '../../../../core/services/accomodation.service';
import { Accommodation } from '../../../../core/models/accommodation.model';

@Component({
  selector: 'app-featured-accommodations',
  templateUrl: './featured-accommodations.component.html',
  styleUrls: ['./featured-accommodations.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule]
})
export class FeaturedAccommodationsComponent implements OnInit {
  featuredAccommodations: Accommodation[] = [];

  constructor(private accommodationService: AccommodationService) {}

  ngOnInit(): void {
    this.loadFeaturedAccommodations();
  }

  loadFeaturedAccommodations(): void {
    this.accommodationService.getAccommodations().subscribe(
      (accommodations) => {
        this.featuredAccommodations = accommodations.slice(0, 3);
      },
      (error) => {
        console.error('Error fetching featured accommodations:', error);
      }
    );
  }
}