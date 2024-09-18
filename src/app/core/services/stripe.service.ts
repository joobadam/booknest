import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private stripePromise = loadStripe(environment.stripePublishableKey);

  constructor(private http: HttpClient) {}

  createCheckoutSession(bookingData: any): Observable<{ sessionId: string }> {
    const apiUrl = `${environment.apiUrl}/create-checkout-session`;
    console.log('Sending request to:', apiUrl);
    console.log('Booking data:', bookingData);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<{ sessionId: string }>(apiUrl, bookingData, { headers })
      .pipe(
        tap(response => console.log('Received response:', response)),
        catchError(this.handleError)
      );
  }

  async redirectToCheckout(sessionId: string) {
    try {
      console.log('Redirecting to checkout with sessionId:', sessionId);
      const stripe = await this.stripePromise;
      const result = await stripe!.redirectToCheckout({
        sessionId: sessionId,
      });
      if (result.error) {
        console.error('Stripe redirect error:', result.error);
        throw result.error;
      }
    } catch (error) {
      console.error('Error in redirectToCheckout:', error);
      throw error;
    }
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    if (error.error instanceof ErrorEvent) {
      console.error('Client-side error:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, body was:`, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}