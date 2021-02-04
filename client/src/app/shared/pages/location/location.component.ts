import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../../services/http.service";
import {MatDialog} from "@angular/material/dialog";
import {ReviewComponent} from "../../../dialog/review/review.component";
import {AuthServices} from "../../../services/auth.services";
import {Location} from "../../../services/interfaces";
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  location: Location ;

  constructor(private http: HttpService,
              private dialog: MatDialog,
              private auth: AuthServices) { }

  ngOnInit(): void {
    this.http.getLocation('601977a5ce2e1928b08b0e6a').subscribe(location => {
      this.location = location;
      console.log(this.location)
    });

    navigator.geolocation.getCurrentPosition(data => {
      console.log(data.coords.latitude, data.coords.longitude)
    })
  }

  openAddReview() {
    const dialogRef = this.dialog.open(
      ReviewComponent,
      {data: this.location.name})

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.http.createReview(this.location._id, {rating: result[0], reviewText: result[1], author: this.auth.getName()})
          .subscribe(
          data => {
            this.location.reviews.push(data);
            console.log(this.location)
          }
        )
      }
    })
  }



}
