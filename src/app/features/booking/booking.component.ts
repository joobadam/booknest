import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService, Booking } from '../../core/services/booking.service';
import { AuthService } from '../../core/services/auth.service';
import { switchMap, take } from 'rxjs/operators';
import { AccommodationService } from '../../core/services/accomodation.service';
import { Accommodation } from '../../core/models/accommodation.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  bookingForm: FormGroup;
  accommodationId: string;
  accommodation: Accommodation | null = null;
  isLoggedIn = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private bookingService: BookingService,
    private accommodationService: AccommodationService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.bookingForm = this.fb.group({
      checkIn: ['', Validators.required],
      checkOut: ['', Validators.required],
      guests: ['', [Validators.required, Validators.min(1)]]
    });
    this.accommodationId = '';
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.accommodationId = id;
      this.accommodationService.getAccommodationById(this.accommodationId)
        .pipe(take(1))
        .subscribe(accommodation => {
          this.accommodation = accommodation;
        });
    } else {
      console.error('No accommodation ID provided');
      this.router.navigate(['/']);
    }
    this.authService.isLoggedIn().subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });
  }

  onSubmit(): void {
    if (!this.isLoggedIn) {
      this.snackBar.open('A foglaláshoz be kell jelentkeznie vagy regisztrálnia kell.', 'Bezár', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
      return;
    }

    if (this.bookingForm.valid && this.accommodation) {
      this.authService.user$.pipe(
        take(1),
        switchMap(user => {
          if (!user) throw new Error('User not authenticated');
          
          const booking: Booking = {
            accommodationId: this.accommodationId,
            userId: user.uid,
            checkIn: this.bookingForm.value.checkIn,
            checkOut: this.bookingForm.value.checkOut,
            guests: this.bookingForm.value.guests,
            totalPrice: this.calculateTotalPrice()
          };
          
          return this.bookingService.createBooking(booking);
        })
      ).subscribe(
        () => {
          console.log('Booking successful');
          this.router.navigate(['/bookings']);
        },
        error => {
          console.error('Error creating booking:', error);
        }
      );
    }
  }

  calculateTotalPrice(): number {
    if (!this.accommodation) return 0;
    const checkIn = new Date(this.bookingForm.value.checkIn);
    const checkOut = new Date(this.bookingForm.value.checkOut);
    const nights = (checkOut.getTime() - checkIn.getTime()) / (1000 * 3600 * 24);
    return nights * this.accommodation.price;
  }
}