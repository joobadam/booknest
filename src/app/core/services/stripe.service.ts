import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private stripePromise: Promise<Stripe | null>;

  constructor(private http: HttpClient) {
    this.stripePromise = loadStripe(environment.stripePublishableKey);
  }

  createCheckoutSession(bookingData: any): Observable<{ sessionId: string }> {
    console.log('Sending request to create checkout session:', bookingData);
    return this.http.post<{ sessionId: string }>('/api/create-checkout-session', bookingData);
  }

  async redirectToCheckout(sessionId: string) {
    const stripe = await this.stripePromise;
    if (stripe) {
      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) {
        console.error('Error redirecting to checkout:', error);
      }
    } else {
      console.error('Stripe failed to load');
    }
  }
}