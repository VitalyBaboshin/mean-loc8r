import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import * as M from 'materialize-css';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  form: FormGroup;
  constructor() { }

  ngOnInit(): void {
    M.updateTextFields();
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6), Validators.maxLength(20)
      ])
    })

  }

  onLogin() {

  }
}
