import {Injectable} from '@angular/core';
import {MapPoint} from '../models/map-point.model';

@Injectable({
  providedIn: 'root'
})

export class LocationService {
  mapPoint: MapPoint;
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
}

