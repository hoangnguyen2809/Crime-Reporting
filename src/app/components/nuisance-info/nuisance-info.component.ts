import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Crime } from '../../Crime';
import { Subscription } from 'rxjs';
import { UiService } from '../../services/ui.service';
import { CrimeService } from '../../services/crime.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nuisance-info',
  templateUrl: './nuisance-info.component.html',
  styleUrl: './nuisance-info.component.css',
})
export class NuisanceInfoComponent {
  @Input() crime?: Crime;
  @Output() onChangeStatus: EventEmitter<Crime> = new EventEmitter();

  showMoreInfo?: boolean;
  subscription: Subscription;
  constructor(
    private uiService: UiService,
    private villainService: CrimeService,
    private http: HttpClient
  ) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showMoreInfo = value));
  }
  changeStatus(event: Event) {
    event.preventDefault();
    let password = prompt('Please enter password:');
    this.http
      .get<Object>('https://api.hashify.net/hash/md5/hex?value=' + password)
      .subscribe((data: any) => {
        const hashedPassword = data.Digest;

        if (hashedPassword === 'fcab0453879a2b2281bc5073e3f5fe54') {
          if (this.crime) {
            this.crime.data.status = !this.crime.data.status;
            this.villainService.changeStatus(this.crime).subscribe();
          }
          this.onChangeStatus.emit(this.crime);
        } else {
          alert('Wrong password');
        }
      });
  }
}
