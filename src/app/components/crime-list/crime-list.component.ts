import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Crime } from '../../Crime';
import { CrimeService } from '../../services/crime.service';

@Component({
  selector: 'app-crime-list',
  templateUrl: './crime-list.component.html',
  styleUrl: './crime-list.component.css',
})
export class CrimeListComponent implements OnInit {
  crimes: Crime[] = [];
  query: string;
  defaultLocationSort: number = 0;
  defaultNameSort: number = 0;
  defaultTimeSort: number = 0;
  defaultStatusSort: number = 0;

  constructor(private crimeService: CrimeService) {
    this.query = '';
  }

  ngOnInit(): void {
    this.fetchCrimes();
    this.subscribeToAddCrime();
  }

  private fetchCrimes(): void {
    this.crimeService.getCrimes().subscribe((crimes: Crime[]) => {
      this.crimes = crimes;
    });
  }

  private subscribeToAddCrime(): void {
    this.crimeService
      .getNewlyAddedCrime()
      .subscribe((addedCrime: Crime | null) => {
        if (addedCrime) {
          this.crimes.push(addedCrime);
        }
      });
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
      alert('Please enter a password to delete a case');
    }
  }

  sortLocation() {
    if (this.defaultLocationSort == 0) {
      this.crimes.sort((a, b) =>
        a.data.location.name.localeCompare(b.data.location.name)
      );
      this.defaultLocationSort = 1;
    } else if (this.defaultLocationSort == 1) {
      this.crimes.sort((a, b) =>
        b.data.location.name.localeCompare(a.data.location.name)
      );
      this.defaultLocationSort = 2;
    } else if (this.defaultLocationSort == 2) {
      this.sortTime();
      this.defaultLocationSort = 0;
    }
  }
  sortName() {
    if (this.defaultNameSort == 0) {
      this.crimes.sort((a, b) => a.data.name.localeCompare(b.data.name));
      this.defaultNameSort = 1;
    } else if (this.defaultNameSort == 1) {
      this.crimes.sort((a, b) => b.data.name.localeCompare(a.data.name));
      this.defaultNameSort = 2;
    } else if (this.defaultNameSort == 2) {
      this.sortTime();
      this.defaultNameSort = 0;
    }
  }
  sortTime() {
    if (this.defaultTimeSort == 0) {
      this.crimes.sort((a, b) => a.data.time_reported - b.data.time_reported);
      this.defaultTimeSort = 1;
    } else if (this.defaultTimeSort == 1) {
      this.crimes.sort((a, b) => b.data.time_reported - a.data.time_reported);
      this.defaultTimeSort = 2;
    } else if (this.defaultTimeSort == 2) {
      this.crimes.sort((a, b) => a.data.time_reported - b.data.time_reported);
      this.defaultTimeSort = 0;
    }
  }
  sortStatus() {
    if (this.defaultStatusSort == 0) {
      this.crimes.sort(
        (a, b) => (a.data.status ? -1 : 1) - (b.data.status ? -1 : 1)
      );
      this.defaultNameSort = 1;
    } else if (this.defaultNameSort == 1) {
      this.crimes.sort(
        (a, b) => (b.data.status ? -1 : 1) - (a.data.status ? -1 : 1)
      );
      this.defaultNameSort = 2;
    } else if (this.defaultNameSort == 2) {
      this.sortTime();
      this.defaultNameSort = 0;
    }
  }

  addCrime(crime: Crime) {
    console.log('Crime taken inside crime-list' + crime);
    this.crimeService.addCrime(crime).subscribe((crime) => {
      this.crimes.push(crime);
    });
  }
}
