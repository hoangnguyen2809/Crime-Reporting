import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Crime, Location } from '../../Crime';
import { CrimeService } from '../../services/crime.service';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crime-add-form',
  templateUrl: './crime-add-form.component.html',
  styleUrl: './crime-add-form.component.css',
})
export class CrimeAddFormComponent implements OnInit {
  @Output() onAddCrime: EventEmitter<Crime> = new EventEmitter();
  existingLocations: Location[] = [];
  clickedCoordinates: { lat: number; lng: number } = { lat: 0, lng: 0 };

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
  newLocationError: boolean = false;
  locationError: boolean = false;
  reporterError: boolean = false;
  phoneError: boolean = false;

  newLocation: string = '';

  constructor(private crimeService: CrimeService, private router: Router) {}

  isValidName(): boolean {
    return /^[A-Za-z\s.-]+$/.test(this.name || '');
  }

  isValidLocation(): boolean {
    return /^[A-Za-z\s]+$/.test(this.location || '');
  }

  isValidReporter(): boolean {
    return /^[A-Za-z\s.-]+$/.test(this.reporter || '');
  }

  isValidPhone(): boolean {
    return /^\d+$/.test(this.phone || '');
  }

  ngOnInit(): void {
    this.crimeService.getExistingLocations().subscribe((location) => {
      this.existingLocations = location;
    });

    this.crimeService.getClickedCoordinates().subscribe((coordinates) => {
      if (coordinates) {
        this.clickedCoordinates = coordinates;
        console.log('Clicked coordinates:', this.clickedCoordinates);
      }
    });
  }

  onSubmit() {
    let foundLocation;

    if (this.location === 'newLocation') {
      this.location = this.newLocation;
      this.latitude = this.clickedCoordinates.lat;
      this.longitude = this.clickedCoordinates.lng;
    } else {
      foundLocation = this.existingLocations.find(
        (location) => location.name === this.location
      );
      this.latitude = foundLocation!.latitude;
      this.longitude = foundLocation!.longitude;
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
    this.crimeService.addCrime(newCrime).subscribe((addedCrime: Crime) => {});

    this.name = '';
    this.location = '';
    this.reporter = '';
    this.phone = '';
    this.extra = '';
    this.image = '';

    this.router.navigate(['']);
  }

  areAllFieldsValid(): boolean {
    this.nameError = !this.name || this.name.length < 3 || !this.isValidName();
    this.locationError =
      !this.location || this.location.length < 3 || !this.isValidLocation();
    // console.log('location', this.locationError);
    this.newLocationError =
      !this.newLocation ||
      this.newLocation.length < 3 ||
      !this.isValidLocation();
    // console.log('newLocation', this.newLocationError);
    this.reporterError =
      !this.reporter || this.reporter.length < 3 || !this.isValidReporter();
    this.phoneError =
      !this.phone || this.phone.length < 7 || !this.isValidPhone();

    const latitudeError = this.clickedCoordinates.lat === 0;
    const longitudeError = this.clickedCoordinates.lng === 0;
    // console.log(latitudeError, longitudeError);

    if (
      this.location !== 'newLocation' &&
      this.locationError === false &&
      this.newLocationError === true
    ) {
      return !(
        this.nameError ||
        this.locationError ||
        this.reporterError ||
        this.phoneError
      );
    } else {
      return !(
        this.nameError ||
        this.locationError ||
        this.reporterError ||
        this.phoneError ||
        this.newLocationError ||
        latitudeError ||
        longitudeError
      );
    }
  }
}
