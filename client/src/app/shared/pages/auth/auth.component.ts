import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as M from 'materialize-css';
import {AuthServices} from '../../../services/auth.services';
import {Router} from '@angular/router';
import {Subscription} from "rxjs";
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  form: FormGroup;
  loginSub: Subscription;
  constructor(private auth: AuthServices,
              private router: Router) { }

  ngOnInit(): void {
    M.updateTextFields();
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6), Validators.maxLength(20)
      ])
    });

  }

  onLogin() {
    this.form.disable();
    this.loginSub = this.auth.login(this.form.value).subscribe(
      () => this.router.navigate(['/']),
      error => {
        M.toast({html: error.error.message});
        this.form.enable();
        this.form.controls['password'].reset();
      }
    );
  }

  ngOnDestroy(): void {
    if(this.loginSub) {
      this.loginSub.unsubscribe();
    }
  }

}
