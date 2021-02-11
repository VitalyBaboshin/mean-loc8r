import {Component, OnInit, Output} from '@angular/core';
import {icon, latLng, LeafletMouseEvent, Map, MapOptions, marker, Marker, tileLayer} from 'leaflet';
import * as M from 'materialize-css';
import {MapPoint} from '../../../models/map-point.model';
import {LocationService} from '../../../services/location.service';


@Component({
  selector: 'app-map-new',
  templateUrl: './map-new.component.html',
  styleUrls: ['./map-new.component.scss']
})
export class MapNewComponent implements OnInit {
  map: Map;
  options: MapOptions;
  lastLayer: any;
  enableDraw = false;
  coords = [];

  constructor(private locationService: LocationService) {}

  ngOnInit() {

    // Проверяем включена ли геолокация на устройстве
    navigator.geolocation.getCurrentPosition(data => {
      this.locationService.mapPointCreate = {latitude: data.coords.latitude, longitude: data.coords.longitude};
      this.enableDraw = true;
      this.locationService.setStateLocation(true);
      this.initializeMapOptions();
    }, (error) => {
      if (error.PERMISSION_DENIED) {
        M.toast({html: 'Для доступа ко всему функционалу приложения включите геолокацию и перезапустите'}, );
        this.locationService.setStateLocation(false);
        this.enableDraw = true;
        this.initializeDefaultMapPoint();
        this.initializeMapOptions();
      }
    });
  }

  private initializeMapOptions() {

    this.options = {
      zoom: 13,
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

// По дефолту координаты любимого города Санкт-Петербург
  private initializeDefaultMapPoint() {
    this.locationService.MapPointCreate = this.locationService.MapPointDefault;

  }

  initializeMap(map: Map) {
    this.map = map;
    this.createMarker();
  }

  public onMapClick(e: LeafletMouseEvent) {
    this.clearMap();
    this.updateMapPoint(e.latlng.lat, e.latlng.lng);
    this.createMarker();

  }
  private clearMap() {
    if (this.map.hasLayer(this.lastLayer)) { this.map.removeLayer(this.lastLayer); }
  }
  private updateMapPoint(latitude: number, longitude: number) {
    this.locationService.MapPointCreate = {latitude, longitude};
  }
  private createMarker() {
    this.clearMap();
    const mapIcon = this.getDefaultIcon();
    const coordinates = latLng(
      [this.locationService.MapPointCreate.latitude,
        this.locationService.MapPointCreate.longitude]);
    // const coordinates = latLng([this.mapPoint.latitude, this.mapPoint.longitude]);
    this.lastLayer = marker(coordinates).setIcon(mapIcon).addTo(this.map);
    this.map.setView(coordinates, this.map.getZoom());
  }
  private getDefaultIcon() {
    return icon({
      iconSize: [25, 41],
      iconAnchor: [13, 41],
      iconUrl: 'assets/marker-icon.png'
    });
  }



}
