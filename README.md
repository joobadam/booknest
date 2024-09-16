# Accommodation Booking Website

This project implements an accommodation booking website using Angular 18.

## Technologies

- **Angular**: The project uses Angular 18 with the AppModule approach.
- **Angular Material**: The user interface is built with Angular Material UI components.
- **Firebase**: We use Firebase and Firestore for data storage and authentication management.
- **Stripe**: The payment process is implemented with Stripe integration.

## Project Structure

The project follows the traditional Angular project structure with AppModule at the root.

## Installation

1. Clone the repository:
   ```
   git clone [repo URL]
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   ng serve
   ```

## Configuration

For Firebase and Stripe configuration, create an `environment.ts` file with the following content:

```typescript
export const environment = {
  production: false,
  firebaseConfig: {
    // Firebase configuration
  },
  stripePublishableKey: 'your_stripe_publishable_key'
};
```

## Usage

After launching the application, users can:
- Browse accommodations
- Register or log in
- Make reservations
- Pay for bookings through the Stripe system

## Contributing

If you'd like to contribute to the project, please open a new issue or pull request.

## License
joobadam
