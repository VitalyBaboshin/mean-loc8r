import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LocationsComponent} from "./shared/pages/locations/locations.component";
import {LocationComponent} from "./shared/pages/location/location.component";
import {AboutComponent} from "./shared/pages/about/about.component";
import {ReviewComponent} from "./dialog/review/review.component";
import {AuthComponent} from "./shared/pages/auth/auth.component";
import {RegisterComponent} from "./shared/pages/register/register.component";
import {CreateLocationComponent} from "./shared/pages/create-location/create-location.component";


const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: '', component: LocationsComponent, pathMatch: 'full'},
  {path: 'about', component: AboutComponent, pathMatch: 'full'},
  {path: 'auth', component: AuthComponent, pathMatch: 'full'},
  {path: 'register', component: RegisterComponent, pathMatch: 'full'},
  {path: 'location', component: LocationComponent, pathMatch: 'full'},
  {path: 'location/new', component: CreateLocationComponent, pathMatch: 'full'},
  {path: 'location/:id', component: LocationComponent, pathMatch: 'full'},
  {path: 'location/review/new', component: ReviewComponent, pathMatch: 'full'},
  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

