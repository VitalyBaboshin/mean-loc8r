import {Component, OnInit, Output} from '@angular/core';
import * as M from 'materialize-css';
import {AuthServices} from '../../../services/auth.services';
import {HttpService} from '../../../services/http.service';
import {Location} from '../../../services/interfaces';
import {Router} from '@angular/router';
import {LocationService} from '../../../services/location.service';
@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {

  isAuth: boolean;
  locations: [Location];
  locCoords: [number, number];

  constructor(private auth: AuthServices,
              private http: HttpService,
              private router: Router,
              private locationService: LocationService) {
    this.isAuth = this.auth.isAuthenticated();
    navigator.geolocation.getCurrentPosition(data => {
      console.log(data.coords.latitude, data.coords.longitude);
      this.locCoords = [data.coords.latitude, data.coords.longitude];
      this.locationService.setStateLocation(true);
      console.log('this.locationService.getStateLocation()', this.locationService.getStateLocation());
    }, (error) => {
      if (error.PERMISSION_DENIED) {
        M.toast({html: 'Для доступа ко всему функционалу приложения включите геолокацию и перезапустите'}, );
        this.locationService.setStateLocation(false);
        console.log('this.locationService.getStateLocation()', this.locationService.getStateLocation());
      }
    });
  }

  ngOnInit(): void {
    this.http.getAllLocations().subscribe(locations => {
      this.locations = locations;
    });
    M.updateTextFields();
    this.auth.isAuthenticated();
  }

  openLocation(id: string) {
    this.router.navigate([`/location/${id}`]);
    // this.http.getLocation(id).subscribe();
    console.log(id);
  }

  createLocation() {
    console.log('createlocation');
    this.http.create({
      name: 'you-tube',
      address: 'street 1 land',
      rating: 1.5
    }).subscribe();
  }

  getAllLocation() {
    console.log('getAll');
    this.http.getAllLocations().subscribe();
  }

  getLocation() {
    this.http.getLocation('601977a5ce2e1928b08b0e6a').subscribe();
  }
}


