import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Booking } from '../models/booking.model';



@Injectable({
  providedIn: 'root'
})
export class BookingService {
  constructor(
    private firestore: AngularFirestore,
    private http: HttpClient
  ) {}

  createBooking(booking: Booking): Promise<any> {
    return this.firestore.collection('bookings').add(booking);
  }

  getBookingsByUser(userId: string): Observable<Booking[]> {
    return this.firestore.collection<Booking>('bookings', ref => ref.where('userId', '==', userId))
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Booking;
          const id = a.payload.doc.id;
          return { ...data, id };
        }))
      );
  }

  getBookingsByAccommodation(accommodationId: string): Observable<Booking[]> {
    return this.firestore.collection<Booking>('bookings', ref => ref.where('accommodationId', '==', accommodationId))
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Booking;
          const id = a.payload.doc.id;
          return { ...data, id };
        }))
      );
  }

  updateBooking(id: string, booking: Partial<Booking>): Promise<void> {
    return this.firestore.doc(`bookings/${id}`).update(booking);
  }

  deleteBooking(id: string): Promise<void> {
    return this.firestore.doc(`bookings/${id}`).delete();
  }

  finalizeBooking(sessionId: string): Observable<any> {
    return this.http.post('/api/finalize-booking', { sessionId });
  }
}