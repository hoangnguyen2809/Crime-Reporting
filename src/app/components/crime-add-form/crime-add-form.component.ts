import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Crime, Location } from '../../Crime';
import { CrimeService } from '../../services/crime.service';

@Component({
  selector: 'app-crime-add-form',
  templateUrl: './crime-add-form.component.html',
  styleUrl: './crime-add-form.component.css',
})
export class CrimeAddFormComponent implements OnInit {
  form: FormGroup;
  existingLocations: Location[] = [];
  constructor(private crimeService: CrimeService) {
    let formControls = {
      name: new FormControl(),
      location: new FormControl(),
      phone: new FormControl(),
      extra: new FormControl(),
      reporter: new FormControl(),
    };

    this.form = new FormGroup(formControls);
  }
  ngOnInit(): void {
    this.crimeService
      .getExistingLocations()
      .subscribe((location) => (this.existingLocations = location));
    console.log(this.existingLocations);
  }

  onSubmit(crime: Crime) {
    const time = new Date().getTime();
  }
}
