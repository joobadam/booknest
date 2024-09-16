import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookingService } from '../../core/services/booking.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent implements OnInit {
  sessionId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private bookingService: BookingService
  ) { }

  ngOnInit() {
    this.sessionId = this.route.snapshot.queryParamMap.get('session_id');
    console.log('Session ID:', this.sessionId); // Hozzáadott debug log
    if (this.sessionId) {
      this.bookingService.finalizeBooking(this.sessionId).subscribe(
        () => console.log('Booking finalized'),
        error => console.error('Error finalizing booking:', error)
      );
    }
  }
}