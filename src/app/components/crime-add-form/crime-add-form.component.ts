import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Crime, Location } from '../../Crime';
import { CrimeService } from '../../services/crime.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-crime-add-form',
  templateUrl: './crime-add-form.component.html',
  styleUrl: './crime-add-form.component.css',
})
export class CrimeAddFormComponent implements OnInit {
  @Output() onAddCrime: EventEmitter<Crime> = new EventEmitter();
  existingLocations: Location[] = [];

  image!: string;
  name!: string;
  location!: string;
  longitude!: number;
  latitude!: number;
  reporter!: string;
  phone!: string;
  extra!: string;
  status!: boolean;

  nameError: boolean = false;
  locationError: boolean = false;
  reporterError: boolean = false;
  phoneError: boolean = false;

  newLocation: string = '';

  constructor(private crimeService: CrimeService) {}

  isValidName(): boolean {
    return /^[A-Za-z\s]+$/.test(this.name || '');
  }

  isValidLocation(): boolean {
    return /^[A-Za-z\s]+$/.test(this.location || '');
  }

  isValidReporter(): boolean {
    return /^[A-Za-z\s]+$/.test(this.reporter || '');
  }

  isValidPhone(): boolean {
    return /^\d+$/.test(this.phone || '');
  }

  ngOnInit(): void {
    this.crimeService.getExistingLocations().subscribe((location) => {
      this.existingLocations = location;
      console.log(this.existingLocations); // Log inside the subscription block
    });
  }

  onSubmit() {
    if (this.location === 'newLocation') {
      this.location = this.newLocation;
    }

    const key = uuidv4();
    const newCrime = {
      key: key,
      data: {
        image: this.image,
        name: this.name,
        location: {
          name: this.location,
          longitude: this.longitude,
          latitude: this.latitude,
        },
        reporter: this.reporter,
        phone: this.phone,
        status: true,
        extra: this.extra,
        time_reported: new Date().getTime(),
      },
    };
    console.log(newCrime);

    this.onAddCrime.emit(newCrime);

    this.name = '';
    this.location = '';
    this.reporter = '';
    this.phone = '';
    this.extra = '';
    this.image = '';
  }

  areAllFieldsValid(): boolean {
    this.nameError = !this.name || this.name.length < 3 || !this.isValidName();
    this.locationError =
      !this.location || this.location.length < 3 || !this.isValidLocation();
    this.reporterError =
      !this.reporter || this.reporter.length < 3 || !this.isValidReporter();
    this.phoneError =
      !this.phone || this.phone.length < 7 || !this.isValidPhone();
    return !(
      this.nameError ||
      this.locationError ||
      this.reporterError ||
      this.phoneError
    );
  }
}
