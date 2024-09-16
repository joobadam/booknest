import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../../../core/services/auth.service';
import { BookingService,  } from '../../../core/services/booking.service';
import { Booking } from '../../../core/models/booking.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  bookings$!: Observable<Booking[]>;

  constructor(
    private authService: AuthService,
    private bookingService: BookingService
  ) { }

  ngOnInit(): void {
    this.bookings$ = this.authService.user$.pipe(
      switchMap(user => {
        if (user) {
          return this.bookingService.getBookingsByUser(user.uid);
        } else {
          return of([]);
        }
      })
    );
  }
}