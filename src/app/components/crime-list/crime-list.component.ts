import { Component, OnInit } from '@angular/core';
import { Crime } from '../../Crime';
import { CrimeService } from '../../services/crime.service';

@Component({
  selector: 'app-crime-list',
  templateUrl: './crime-list.component.html',
  styleUrl: './crime-list.component.css',
})
export class CrimeListComponent {
  crimes: Crime[] = [];
  query: string;
  constructor(private crimeService: CrimeService) {
    this.query = '';
  }

  ngOnInit(): void {
    this.crimeService.getCrimes().subscribe((crimes) => (this.crimes = crimes));
  }

  deleteCrime(crime: Crime) {
    const password = prompt('Please enter password:');
    if (password !== null && password !== '') {
      this.crimeService.verifyPassword(password).subscribe((isValid) => {
        if (isValid) {
          this.crimeService.deleteCrime(crime).subscribe(() => {
            this.crimes = this.crimes.filter((v) => v.key !== crime.key);
          });
        } else {
          alert('Wrong password');
        }
      });
    } else {
      alert('Please enter a password');
    }
  }
}
