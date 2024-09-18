import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private stripePromise = loadStripe(environment.stripePublishableKey);

  constructor(private http: HttpClient) {}

  createCheckoutSession(bookingData: any): Observable<{ sessionId: string }> {
    return this.http.post<{ sessionId: string }>('/api/create-checkout-session', bookingData);
  }

  async redirectToCheckout(sessionId: string) {
    try {
      const stripe = await this.stripePromise;
      const result = await stripe!.redirectToCheckout({
        sessionId: sessionId,
      });
      if (result.error) {
        console.error(result.error);
      }
    } catch (error) {
      console.error('Error in redirectToCheckout:', error);
    }
  }
}