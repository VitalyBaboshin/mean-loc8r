import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../../services/http.service';
import {MatDialog} from '@angular/material/dialog';
import {ReviewComponent} from '../../../dialog/review/review.component';
import {AuthServices} from '../../../services/auth.services';
import {Location, OpeningTime} from '../../../services/interfaces';
import {ActivatedRoute, Router} from '@angular/router';
import * as M from 'materialize-css';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  locationId: string;
  location: Location;
  locCoords: [number];
  isDataAvailable = false;
  isAuth;

  constructor(private http: HttpService,
              private dialog: MatDialog,
              private auth: AuthServices,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit(): void {
    this.locationId = this.route.snapshot.params.id;
    this.http.getLocation(this.locationId).subscribe(location => {
      this.location = location;
      this.locCoords = location.coords;
      this.isDataAvailable = true;
    }, error => {
      console.log(error);
      M.toast({html: 'Не удалось загрузить локацию'}, );
      this.router.navigate([`/`]);
    });
    this.isAuth = this.auth.isAuthenticated();
  }

  openAddReview() {
    const dialogRef = this.dialog.open(
      ReviewComponent,
      {data: this.location.name});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.http.createReview(this.location._id, {rating: result[0], reviewText: result[1], author: this.auth.getName()})
          .subscribe(
            data => {
              this.location.reviews.push(data);
            }
          );
      }
    });
  }

}
