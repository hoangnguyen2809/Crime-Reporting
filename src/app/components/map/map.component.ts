import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import { icon, Marker } from 'leaflet';
import { Crime, Location } from '../../Crime';
import { CrimeService } from '../../services/crime.service';
import { Router, NavigationEnd } from '@angular/router';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';

const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent implements AfterViewInit {
  private map: any;
  crimes: Crime[] = [];
  popup = L.popup();
  mapClickEnabled = true;
  existingLocations: Location[] = [];
  markers: L.Marker[] = [];

  constructor(private crimeService: CrimeService, private router: Router) {
    this.onMapClick = this.onMapClick.bind(this);
  }
  ngOnInit(): void {
    // Subscribe to router events to detect route changes
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/add') {
          // Show the map and handle onMapClick for the "/add" route
          this.mapClickEnabled = true;

          // Clear markers and their popups when navigating to "/add"
          this.clearMarkers();
        } else if (event.url === '/') {
          // Call showAllMarker only when the route is empty ("")
          this.crimeService.getExistingLocations().subscribe((locations) => {
            this.existingLocations = locations;
            console.log('Existing Locations:', this.existingLocations);

            this.showAllMarker(this.existingLocations);
          });
        }
      }
    });
  }

  showAllMarker(existingLocations: Location[]): void {
    existingLocations.forEach((location) => {
      const { name, latitude, longitude } = location;
      const marker = L.marker([latitude, longitude]).addTo(this.map);
      marker.addTo(this.map).bindPopup(`<b>${name}</b><br/>`);

      // Store the marker in the markers array
      this.markers.push(marker);
    });
  }

  clearMarkers(): void {
    // Remove all markers and their popups from the map
    this.markers.forEach((marker) => {
      marker.remove();
    });

    // Clear the markers array
    this.markers = [];
  }

  ngAfterViewInit(): void {
    this.showMap();

    this.map.on('click', this.onMapClick);
  }

  showMap() {
    this.map = L.map('mapid').setView([49.27, -123], 11);

    const tiles = L.tileLayer(
      'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 19,
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> ',
      }
    ).addTo(this.map);
  }

  onMapClick = (e: any) => {
    if (this.mapClickEnabled) {
      const { lat, lng } = e.latlng;

      // Store the clicked coordinates in the service
      this.crimeService.setClickedCoordinates(lat, lng);

      this.popup
        .setLatLng(e.latlng)
        .setContent('You clicked the map at ' + e.latlng.toString())
        .openOn(this.map);
    }
  };

  closeMapPopup(): void {
    if (this.popup.isOpen()) {
      this.popup.remove();
    }
  }
}
