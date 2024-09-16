  import { Component, OnInit } from '@angular/core';
  import { AccommodationService } from '../../../../core/services/accomodation.service';
  import { Accommodation } from '../../../../core/models/accommodation.model';
  
  @Component({
    selector: 'app-accommodation-carousel',
    templateUrl: './accommodation-carousel.component.html',
    styleUrls: ['./accommodation-carousel.component.css']
  })
  export class AccommodationCarouselComponent implements OnInit {
    accommodations: Accommodation[] = [];
    visibleAccommodations: Accommodation[] = [];
    currentIndex = 0;
    itemsToShow = 3; // Egyszerre látható szállások száma
  
    constructor(private accommodationService: AccommodationService) {}
  
    ngOnInit(): void {
      this.loadAccommodations();
    }
  
    loadAccommodations(): void {
      this.accommodationService.getAccommodations().subscribe(
        (accommodations) => {
          this.accommodations = accommodations;
          this.updateVisibleAccommodations();
        },
        (error) => {
          console.error('Error fetching accommodations:', error);
        }
      );
    }
  
    next(): void {
      this.currentIndex = (this.currentIndex + 1) % this.accommodations.length;
      this.updateVisibleAccommodations();
    }
  
    previous(): void {
      this.currentIndex = (this.currentIndex - 1 + this.accommodations.length) % this.accommodations.length;
      this.updateVisibleAccommodations();
    }
  
    updateVisibleAccommodations(): void {
      this.visibleAccommodations = [];
      for (let i = 0; i < this.itemsToShow; i++) {
        const index = (this.currentIndex + i) % this.accommodations.length;
        this.visibleAccommodations.push(this.accommodations[index]);
      }
    }
  }