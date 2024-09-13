import { Component } from '@angular/core';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrl: './features.component.css'
})
export class FeaturesComponent {
  features = [
    { icon: 'search', title: 'Egyszerű keresés', description: 'Találd meg álmaid szállását pillanatok alatt.' },
    { icon: 'verified_user', title: 'Megbízható partnerek', description: 'Csak ellenőrzött és megbízható szálláshelyek.' },
    { icon: 'local_offer', title: 'Legjobb árak', description: 'Garantáltan a legjobb árak, minden alkalommal.' }
  ];
}
