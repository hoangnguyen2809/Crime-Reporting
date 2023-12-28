import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CrimeComponent } from './components/crime/crime.component';
import { CrimeListComponent } from './components/crime-list/crime-list.component';
import { MapComponent } from './components/map/map.component';
import { SummaryPipe } from './pipes/summary.pipe';
import { UnsolvesPipe } from './pipes/unsolves.pipe';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchPipe } from './pipes/search.pipe';
import { CrimeAddFormComponent } from './components/crime-add-form/crime-add-form.component';
import { RouterModule, Routes } from '@angular/router';
import { NuisanceInfoComponent } from './components/nuisance-info/nuisance-info.component';

const appRoutes: Routes = [
  { path: '', component: CrimeListComponent },
  { path: 'add', component: CrimeAddFormComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CrimeComponent,
    CrimeListComponent,
    MapComponent,
    SummaryPipe,
    UnsolvesPipe,
    SearchPipe,
    CrimeAddFormComponent,
    NuisanceInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
