import { Component } from '@angular/core';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.css'
})
export class TestimonialsComponent {
  testimonials = [
    { name: 'Anna K.', comment: 'Fantasztikus élmény volt! Könnyen megtaláltam a tökéletes szállást a nyaralásunkhoz.', avatar: '/assets/images/avatar1.jpg' },
    { name: 'Péter B.', comment: 'Remek árak és kiváló ügyfélszolgálat. Csak ajánlani tudom!', avatar: '/assets/images/avatar2.jpg' },
    { name: 'Eszter M.', comment: 'A legjobb szállásfoglaló oldal, amit valaha használtam. Gyors és megbízható.', avatar: '/assets/images/avatar3.jpg' }
  ];
}
