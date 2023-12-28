import { Component, Input } from '@angular/core';
import { Crime } from '../../Crime';

@Component({
  selector: 'app-nuisance-info',
  templateUrl: './nuisance-info.component.html',
  styleUrl: './nuisance-info.component.css',
})
export class NuisanceInfoComponent {
  @Input() crime?: Crime;
}
