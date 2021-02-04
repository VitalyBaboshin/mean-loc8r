import { Component, OnInit } from '@angular/core';
import {AuthServices} from "../../../services/auth.services";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  userName: string;

  constructor(private auth: AuthServices) {
    this.userName = this.auth.getName();
  }

  ngOnInit(): void {
    this.auth.name$.subscribe((name) => {
      this.userName = name;
    })
  }

  logOut() {
    this.auth.logout();
  }
}
