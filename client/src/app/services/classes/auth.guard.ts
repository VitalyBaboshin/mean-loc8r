import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {AuthServices} from '../auth.services';
import * as M from 'materialize-css';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private auth: AuthServices,
              private router: Router) {

  }


  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean> {
    if (this.auth.isAuthenticated()) {
      return of(true);
    } else {
      this.router.navigate(['/']);
      M.toast({html: 'Авторизуйтесь'});
      return of(false);
    }
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.canActivate(route, state);
  }
}
