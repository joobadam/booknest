export interface Booking {
    id?: string;
    accommodationId: string;
    userId: string;
    checkIn: Date;
    checkOut: Date;
    guests: number;
    totalPrice: number;
    paymentIntentId: string;
  }