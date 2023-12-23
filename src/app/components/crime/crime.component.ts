import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Crime } from '../../Crime';
import { CRIMES } from '../../mock-crimes';

@Component({
  selector: '[app-crime]',
  templateUrl: './crime.component.html',
  styleUrl: './crime.component.css',
})
export class CrimeComponent {
  @Input() crime!: Crime;
  @Output() onDeleteCrime: EventEmitter<Crime> = new EventEmitter();
  constructor() {}

  onDelete(crime: Crime) {
    this.onDeleteCrime.emit(crime);
  }
}
