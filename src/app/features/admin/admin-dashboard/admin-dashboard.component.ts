import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccommodationService } from '../../../core/services/accomodation.service';
import { Accommodation } from '../../../core/models/accommodation.model';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  accommodations$: Observable<Accommodation[]>;

  constructor(private accommodationService: AccommodationService) {
    this.accommodations$ = this.accommodationService.getAccommodations();
  }

  ngOnInit(): void {}

  deleteAccommodation(id: string): void {
    if (confirm('Biztosan törölni szeretné ezt a szállást?')) {
      this.accommodationService.deleteAccommodation(id);
    }
  }
}