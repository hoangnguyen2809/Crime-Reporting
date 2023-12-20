import { Component } from '@angular/core';
import { Crime } from '../../Crime';
import { CRIMES } from '../../mock-crimes';

@Component({
  selector: 'app-crime',
  templateUrl: './crime.component.html',
  styleUrl: './crime.component.css',
})
export class CrimeComponent {
  crime: any;
  constructor() {
    this.crime = {
      id: '1',
      location: {
        name: 'Metrotown',
        latitude: 49.2276,
        longitude: -123.0076,
      },
      name: 'Bobby',
      time_reported: new Date().getTime(),
      status: true,
      phone: '09238123',
      reporter: 'Jax',
      extra: 'Gruh',
    };
  }
}
