import {Component, ElementRef,  OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AuthServices} from '../../../services/auth.services';

import * as M from 'materialize-css';
import {Router} from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

  @ViewChild('dropdown', {static: true}) elem: ElementRef;

  userName: string;


  constructor(private auth: AuthServices,
              private router: Router) {
    this.userName = this.auth.getName();
  }

  ngOnInit(): void {
    this.auth.name$.subscribe((name) => {
      this.userName = name;
    });
    M.Dropdown.init(this.elem.nativeElement, { alignment: 'right'});

  }

  logOut() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
