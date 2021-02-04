import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LocationsComponent } from './shared/pages/locations/locations.component';
import { LocationComponent } from './shared/pages/location/location.component';
import { ReviewComponent } from './dialog/review/review.component';
import { AboutComponent } from './shared/pages/about/about.component';
import { AuthComponent } from './shared/pages/auth/auth.component';
import { NavbarComponent } from './shared/component/navbar/navbar.component';
import { LoaderComponent } from './shared/component/loader/loader.component';
import { FooterComponent } from './shared/component/footer/footer.component';
import { RegisterComponent } from './shared/pages/register/register.component';
import { RatingComponent } from './shared/component/rating/rating.component';

@NgModule({
  declarations: [
    AppComponent,
    LocationsComponent,
    LocationComponent,
    ReviewComponent,
    AboutComponent,
    AuthComponent,
    NavbarComponent,
    LoaderComponent,
    FooterComponent,
    RegisterComponent,
    RatingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    NoopAnimationsModule
  ],
  providers: [],
  entryComponents: [
    ReviewComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
