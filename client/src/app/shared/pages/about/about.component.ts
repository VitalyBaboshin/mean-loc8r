import { Component, OnInit } from '@angular/core';
import {AuthServices} from "../../../services/auth.services";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private auth: AuthServices) {
    this.auth.isAuthenticated();
  }

  ngOnInit(): void {
  }

}
