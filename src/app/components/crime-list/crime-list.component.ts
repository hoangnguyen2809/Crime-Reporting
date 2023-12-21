import { Component } from '@angular/core';
import { Crime } from '../../Crime';
import { CRIMES } from '../../mock-crimes';

@Component({
  selector: 'app-crime-list',
  templateUrl: './crime-list.component.html',
  styleUrl: './crime-list.component.css',
})
export class CrimeListComponent {
  crimes: Crime[] = CRIMES;
  query: string;
  constructor() {
    this.query = '';
  }
}
