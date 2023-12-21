import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CrimeComponent } from './components/crime/crime.component';
import { CrimeListComponent } from './components/crime-list/crime-list.component';
import { MapComponent } from './components/map/map.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, CrimeComponent, CrimeListComponent, MapComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
