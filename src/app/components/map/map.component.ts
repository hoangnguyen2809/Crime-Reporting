import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import { icon, Marker } from 'leaflet';
import { Crime, Location } from '../../Crime';
import { CrimeService } from '../../services/crime.service';
import { Router, NavigationEnd } from '@angular/router';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon-2x.png';
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
  updateMarkersArray: L.Marker[] = [];

  constructor(private crimeService: CrimeService, private router: Router) {
    this.onMapClick = this.onMapClick.bind(this);
  }
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/add') {
          this.mapClickEnabled = true;
          // this.clearMarkers();
          this.clearUpdateMarkers();
        } else if (event.url === '/') {
          this.mapClickEnabled = false;
          this.closeMapPopup();
          this.crimeService.getExistingLocations().subscribe((locations) => {
            this.existingLocations = locations;
            // this.showAllMarker(this.existingLocations);
            this.updateMarkers();
          });
        }
      }
    });
    this.crimeService
      .getLocationRemoval()
      .subscribe((removedLocation: Location) => {
        const markerToRemove = this.updateMarkersArray.find((marker) => {
          const { latitude, longitude } = removedLocation;
          const markerLatLng = marker.getLatLng();
          return (
            markerLatLng.lat === latitude && markerLatLng.lng === longitude
          );
        });

        if (markerToRemove) {
          markerToRemove.remove();
          this.updateMarkersArray = this.updateMarkersArray.filter(
            (marker) => marker !== markerToRemove
          );
        }
      });
  }

  clearUpdateMarkers(): void {
    this.updateMarkersArray.forEach((marker) => {
      marker.remove();
    });
    this.updateMarkersArray = [];
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
      this.crimeService.setClickedCoordinates(lat, lng);
      this.popup
        .setLatLng(e.latlng)
        .setContent('A nuisance is happening here?')
        .openOn(this.map);
    }
  };

  closeMapPopup(): void {
    if (this.popup.isOpen()) {
      this.popup.remove();
    }
  }
  updateMarkers(): void {
    this.crimeService.getExistingLocations().subscribe((locations) => {
      // Clear existing update markers
      this.updateMarkersArray.forEach((marker) => {
        marker.remove();
      });
      this.updateMarkersArray = [];

      // Get crime counts at each location
      this.crimeService.countCrimesAtLocations().subscribe((crimeCountsMap) => {
        locations.forEach((location) => {
          const { latitude, longitude, name } = location;
          const locationKey = `${latitude},${longitude}`;
          const crimeCount = crimeCountsMap.get(locationKey) || 0; // Get crime count for this location

          const marker = L.marker([latitude, longitude]).addTo(this.map);
          marker
            .addTo(this.map)
            .bindPopup(`<b>${name}</b><br/>Number of case: ${crimeCount}`);

          // Store markers in the updateMarkersArray
          this.updateMarkersArray.push(marker);
        });
      });
    });
  }
}
