import {Component, OnInit, Output} from '@angular/core';
import * as M from 'materialize-css';
import {AuthServices} from "../../../services/auth.services";
import {HttpService} from "../../../services/http.service";
@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {
  currentRate = 0;
  isAuth: boolean;
  locations: [];

  constructor(private auth: AuthServices,
              private http: HttpService) {
    this.isAuth = this.auth.isAuthenticated();
  }

  ngOnInit(): void {
    this.http.getAllLocations().subscribe(locations => {
      this.locations = locations;
    })
    M.updateTextFields();
    this.auth.isAuthenticated()
  }

  openLocation() {
    console.log('clicklocation');
    this.http.getLocation('601977a5ce2e1928b08b0e6a').subscribe();
  }

  createLocation() {
    console.log('createlocation');
    this.http.create({
      name: 'you-tube',
      address: 'street 1 land',
      rating: 1.5
    }).subscribe()
  }

  getAllLocation() {
    console.log('getAll')
    this.http.getAllLocations().subscribe();
  }

  getLocation() {
    this.http.getLocation('601977a5ce2e1928b08b0e6a').subscribe();
  }
}


