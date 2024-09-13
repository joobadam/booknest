import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Booking {
  id?: string;
  accommodationId: string;
  userId: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  totalPrice: number;
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  constructor(private firestore: AngularFirestore) {}

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
}