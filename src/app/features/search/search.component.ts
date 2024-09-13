import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Accommodation } from '../../core/models/accommodation.model';
import { AccommodationService } from '../../core/services/accomodation.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;
  accommodations: Accommodation[] = [];
  filteredAccommodations: Accommodation[] = [];
  isLoggedIn = false;

  constructor(
    private fb: FormBuilder,
    private accommodationService: AccommodationService,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.searchForm = this.fb.group({
      location: ['', Validators.required],
      checkIn: ['', Validators.required],
      checkOut: ['', Validators.required],
      guests: [1, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.loadAccommodations();
    this.authService.isLoggedIn().subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });
  }

  loadAccommodations(): void {
    this.accommodationService.getAccommodations().subscribe(
      (accommodations) => {
        this.accommodations = accommodations;
        this.filteredAccommodations = accommodations;
      },
      (error) => {
        console.error('Error fetching accommodations:', error);
        this.snackBar.open('Hiba történt a szállások betöltésekor. Kérjük, próbálja újra később.', 'Bezár', {
          duration: 5000,
        });
      }
    );
  }

  onSubmit(): void {
    if (this.searchForm.valid) {
      const { location, checkIn, checkOut, guests } = this.searchForm.value;
      this.filteredAccommodations = this.accommodations.filter(acc => 
        acc.location.toLowerCase().includes(location.toLowerCase()) &&
        acc.maxGuests >= guests &&
        this.isAvailable(acc, checkIn, checkOut)
      );

      if (this.filteredAccommodations.length === 0) {
        this.snackBar.open('Nincs a keresési feltételeknek megfelelő szállás.', 'Bezár', {
          duration: 5000,
        });
      }
    }
  }

  isAvailable(accommodation: Accommodation, checkIn: Date, checkOut: Date): boolean {
    // Itt kell implementálni a foglalások ellenőrzését
    // Egyelőre mindig true-t ad vissza
    return true;
  }

  viewDetails(id: string): void {
    this.router.navigate(['/accommodation', id]);
  }

  onBooking(id: string): void {
    if (!this.isLoggedIn) {
      this.snackBar.open('A foglaláshoz be kell jelentkeznie vagy regisztrálnia kell.', 'Bezár', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
      return;
    }
    this.router.navigate(['/booking', id]);
  }
}