import {Component, Input, OnInit} from '@angular/core';
import {icon, latLng, MapOptions, Marker, tileLayer, Map} from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @Input() coords;
  map: Map;
  mapOptions: MapOptions;

  constructor() {
  }

  ngOnInit() {
    this.initializeMapOptions();
    console.log('mapComponent Initialize: coords: ', this.coords);
  }

  private initializeMapOptions() {
    this.mapOptions = {
      center: latLng(this.coords[0], this.coords[1] ),
      zoom: 16,
      layers: [
        tileLayer(
          'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          {
            maxZoom: 18,
            attribution: 'Map data © OpenStreetMap contributors'
          })
      ],
    };
  }
  onMapReady(map: Map) {
    this.map = map;
    this.addSampleMarker();
  }

  private addSampleMarker() {
    const marker = new Marker(this.coords)
      .setIcon(
        icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: 'assets/marker-icon.png'
        }));
    marker.addTo(this.map);
  }
}
