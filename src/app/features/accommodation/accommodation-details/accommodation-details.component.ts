import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Accommodation } from '../../../core/models/accommodation.model';
import { AccommodationService } from '../../../core/services/accomodation.service';

@Component({
  selector: 'app-accommodation-details',
  templateUrl: './accommodation-details.component.html',
  styleUrls: ['./accommodation-details.component.css']
})
export class AccommodationDetailsComponent implements OnInit {
  accommodation$!: Observable<Accommodation>;
  accommodationId!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accommodationService: AccommodationService
  ) { }

  ngOnInit(): void {
    this.accommodationId = this.route.snapshot.paramMap.get('id') || '';
    if (this.accommodationId) {
      this.accommodation$ = this.accommodationService.getAccommodationById(this.accommodationId);
    }
  }

  onBooking(): void {
    this.router.navigate(['/booking', this.accommodationId]);
  }
}
