import {Injectable} from '@angular/core';
import {MapPoint} from '../models/map-point.model';

@Injectable({
  providedIn: 'root'
})

export class LocationService {
  mapPoint: MapPoint = {latitude: 59.939158, longitude: 30.314882};
  // По дефолту координаты любимого города Санкт-Петербург
  mapPointDefault: MapPoint = {latitude: 59.939158, longitude: 30.314882};
  mapPointCreate: MapPoint;
  private isOnLocation: boolean;

  setStateLocation(state: boolean) {
    this.isOnLocation = state;
  }

  getStateLocation(): boolean {
    return this.isOnLocation;
  }

  set MapPoint(coords: MapPoint) {
     this.mapPoint = coords;
  }

  get MapPoint() {
    return this.mapPoint;
  }
  get MapPointDefault() {
    return this.mapPointDefault;
  }

  get MapPointCreate() {
    return this.mapPointCreate;
  }

  set MapPointCreate(coords: MapPoint) {
    this.mapPointCreate = coords;
  }
}

