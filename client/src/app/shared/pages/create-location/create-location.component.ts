import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as M from 'materialize-css';

import {HttpService} from '../../../services/http.service';
import {AuthServices} from "../../../services/auth.services";
import {LocationService} from "../../../services/location.service";


@Component({
  selector: 'app-create-location',
  templateUrl: './create-location.component.html',
  styleUrls: ['./create-location.component.scss']
})
export class CreateLocationComponent implements OnInit {
  @ViewChild('select', {static: true}) elem: ElementRef;

  formCreateFacilities: FormGroup;
  formLocation: FormGroup;
  facilities = [];
  reviewsDeafult = {author: '', rating: '', reviewText: ''};
  reviews = {author: '', rating: null, reviewText: ''};
  facilititesActive = [];
  rating = 0;
  send = {};
  daysDefault = [{days: 'Monday-Friday', opening: '', closing: '', closed: false},
    {days: 'Saturday', opening: '', closing: '', closed: false},
    {days: 'Sunday', opening: '', closing: '', closed: false}];
  days = [{days: 'Monday-Friday', opening: '', closing: '', closed: false},
    {days: 'Saturday', opening: '', closing: '', closed: false},
    {days: 'Sunday', opening: '', closing: '', closed: false}];

  constructor(private http: HttpService,
              private auth: AuthServices,
              private location: LocationService) { }

  ngOnInit(): void {

    M.updateTextFields();
    M.FormSelect.init(this.elem.nativeElement);
    this.formCreateFacilities = new FormGroup({
      nameFacilities: new FormControl(null, [Validators.required])
    });
    this.formLocation = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required])
    });

    this.http.getFacilities().subscribe(data => {
      this.facilities = data;
      this.facilititesActive = Array(this.facilities.length).fill(false);
    });
  }

  createFacilities() {

    this.http.createFacilities(this.formCreateFacilities.value).subscribe(
      data => {
        M.toast({html: data.message});
      }, error => {
        M.toast({html: error.error.message});
      }
    );
  }


  checkFacility(i: number) {
    this.facilititesActive[i] = !this.facilititesActive[i];
  }

  checked(i: number) {
    this.days[i].closed = !this.days[i].closed;
  }

  Publish() {
    this.send = this.formLocation.value;
    this.send['facilities'] = this.facilititesActive.map((item, index) => {
      if (item) {
        return this.facilities[index];
      }
    }).filter(Boolean);
    this.send['openingTimes'] = this.days;

    this.reviews.author = this.auth.getName();
    this.reviews.rating = this.rating;
    this.send['rating'] = this.rating;
    this.send['reviews'] = [this.reviews];
    this.send['coords'] = [this.location.MapPointCreate.latitude, this.location.MapPointCreate.longitude];


    this.http.create(this.send).subscribe( data => {
        M.toast({html: data.message});
        this.formLocation.reset();
        this.days = this.daysDefault;
        this.facilititesActive = [];
        this.reviews = this.reviewsDeafult;
      }
    );
  }
}
