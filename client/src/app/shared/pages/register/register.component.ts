import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import * as M from 'materialize-css';
import {AuthServices} from "../../../services/auth.services";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  constructor(private auth: AuthServices,
              private router: Router) {
  }

  ngOnInit(): void {
    M.updateTextFields();
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6), Validators.maxLength(20)
      ])
    })
  }

  onRegister() {
    this.auth.register(this.form.value).subscribe(((data) => {

      M.toast({html: data.body.message})
      if (data.status === 201) {
        this.auth.login(this.form.value).subscribe();
        this.router.navigate(['/']);
      }
    }),
      error => M.toast({html: error.error.message})
      )
  }



}
