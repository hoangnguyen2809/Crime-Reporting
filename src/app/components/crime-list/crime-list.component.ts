import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { Crime, Location } from '../../Crime';
import { CrimeService } from '../../services/crime.service';

@Component({
  selector: 'app-crime-list',
  templateUrl: './crime-list.component.html',
  styleUrl: './crime-list.component.css',
})
export class CrimeListComponent implements OnInit {
  crimes: Crime[] = [];
  selectedCrime!: Crime;
  query: string;

  defaultLocationSort: number = 0;
  defaultNameSort: number = 0;
  defaultTimeSort: number = 0;
  defaultStatusSort: number = 0;

  isLocationSorted: boolean = false;
  isNameSorted: boolean = false;
  isTimeSorted: boolean = false;
  isStatusSorted: boolean = false;

  locations: Location[] = [];

  @Output() crimeInformation: EventEmitter<Crime> = new EventEmitter();

  constructor(private crimeService: CrimeService) {
    this.query = '';
  }

  ngOnInit(): void {
    this.fetchCrimes();
    this.fetchLocations();
    this.subscribeToAddCrime();
  }

  private fetchCrimes(): void {
    this.crimeService.getCrimes().subscribe((crimes: Crime[]) => {
      this.crimes = crimes;
    });
  }

  fetchLocations(): void {
    this.crimeService
      .getExistingLocations()
      .subscribe((locations: Location[]) => {
        this.locations = locations;
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

            // Find the associated location of the crime
            const location = this.locations.find(
              (loc) => loc.name === crime.data.location.name
            );
            if (location) {
              this.crimeService.removeLocation(location); // Add this method in CrimeService
            }
          });
        } else {
          alert('Wrong password');
        }
      });
    } else {
      alert('Please enter a password to delete a case');
    }
  }
  addCrime(crime: Crime) {
    console.log('Crime taken inside crime-list' + crime);
    this.crimeService.addCrime(crime).subscribe((crime) => {
      this.crimes.push(crime);
    });
  }

  showMoreInfo(crime: Crime) {
    this.selectedCrime = crime; // Assign the received villain to selectedVillain
    this.crimeInformation.emit(crime); // Emitting to parent (ReportComponent)
  }

  sortLocation() {
    this.crimes.sort((a, b) =>
      a.data.location.name.localeCompare(b.data.location.name)
    );
    this.isLocationSorted = true;
    this.isNameSorted = false;
    this.isTimeSorted = false;
  }

  sortName() {
    this.crimes.sort((a, b) => a.data.name.localeCompare(b.data.name));
    this.isLocationSorted = false;
    this.isNameSorted = true;
    this.isTimeSorted = false;
  }

  sortTime() {
    this.crimes.sort((a, b) => a.data.time_reported - b.data.time_reported);
    this.isLocationSorted = false;
    this.isNameSorted = false;
    this.isTimeSorted = true;
  }

  sortStatus() {
    this.crimes.sort(
      (a, b) => (a.data.status ? -1 : 1) - (b.data.status ? -1 : 1)
    );
    this.isLocationSorted = false;
    this.isNameSorted = true;
    this.isTimeSorted = false;
  }
}
