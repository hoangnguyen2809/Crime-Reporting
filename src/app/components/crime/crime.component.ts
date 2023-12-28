import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Crime } from '../../Crime';
import { CRIMES } from '../../mock-crimes';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: '[app-crime]',
  templateUrl: './crime.component.html',
  styleUrl: './crime.component.css',
})
export class CrimeComponent {
  @Input() crime!: Crime;
  @Output() onDeleteCrime: EventEmitter<Crime> = new EventEmitter();
  @Output() onMoreCrime: EventEmitter<Crime> = new EventEmitter();
  @Output() btnClick = new EventEmitter();

  showMoreInfo?: boolean;
  subscription?: Subscription;
  constructor(private uiService: UiService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showMoreInfo = value));
  }

  onDelete(crime: Crime) {
    this.onDeleteCrime.emit(crime);
  }

  onClick() {
    this.btnClick.emit();
  }
  onMore(crime: Crime) {
    console.log(crime);
    this.onMoreCrime.emit(crime);
  }

  toggleMoreInfo() {
    this.uiService.toggleMoreInfo();
  }
}
