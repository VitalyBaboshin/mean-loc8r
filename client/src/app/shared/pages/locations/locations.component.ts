import {Component, OnInit, Output} from '@angular/core';
import * as M from 'materialize-css';
import {AuthServices} from '../../../services/auth.services';
import {HttpService} from '../../../services/http.service';
import {Location} from '../../../services/interfaces';
import {Router} from '@angular/router';
import {LocationService} from '../../../services/location.service';
import {MapPoint} from '../../../models/map-point.model';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {

  isAuth: boolean;
  locations: Location[] = [];
  locCoords: [number, number];
  searchStr = '';

  constructor(private auth: AuthServices,
              private http: HttpService,
              private router: Router,
              private locationService: LocationService) {}

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition(data => {
      const devicePoint: MapPoint = {latitude: data.coords.latitude, longitude: data.coords.longitude };
      this.locationService.MapPoint = devicePoint;
      this.locationService.MapPoint.longitude = data.coords.longitude;
      this.locationService.setStateLocation(true);
      this.http.getAllLocationsParams(
        this.locationService.MapPoint.longitude.toString(),
        this.locationService.MapPoint.latitude.toString()
      ).subscribe(locations => {
        this.locations = locations;
      });

    }, (error) => {
      if (error.PERMISSION_DENIED) {
        M.toast({html: 'Для доступа ко всему функционалу приложения включите геолокацию и перезапустите'}, );
        this.locationService.setStateLocation(false);
      }
      this.locationService.MapPoint = this.locationService.mapPointDefault;

    });
    this.http.getAllLocationsParams(
      this.locationService.MapPoint.longitude.toString(),
      this.locationService.MapPoint.latitude.toString()
    ).subscribe(locations => {
      this.locations = locations;
    });
    M.updateTextFields();
    this.auth.isAuthenticated();
  }

  openLocation(id: string) {
    this.router.navigate([`/location/${id}`]);
    // this.http.getLocation(id).subscribe();

  }

  createLocation() {
    this.http.create({
      name: 'you-tube',
      address: 'street 1 land',
      rating: 1.5
    }).subscribe();
  }

  getAllLocation() {
    this.http.getAllLocations().subscribe();
  }

  getLocation() {
    this.http.getLocation('601977a5ce2e1928b08b0e6a').subscribe();
  }

  getLocationGeo() {
    this.http.getAllLocationsParams(
      this.locationService.MapPoint.longitude.toString(), this.locationService.MapPoint.latitude.toString()).subscribe();
  }
}


