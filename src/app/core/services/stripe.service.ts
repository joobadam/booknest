import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private stripePromise = loadStripe(environment.stripePublishableKey);

  constructor(private http: HttpClient) {}

  createCheckoutSession(bookingData: any): Observable<{ sessionId: string }> {
    return this.http.post<{ sessionId: string }>('/api/create-checkout-session', bookingData)
      .pipe(
        catchError(this.handleError)
      );
  }

  async redirectToCheckout(sessionId: string) {
    try {
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
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}