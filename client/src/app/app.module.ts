import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

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
import { MapComponent } from './shared/component/map/map.component';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import { CreateLocationComponent } from './shared/pages/create-location/create-location.component';
import { MapNewComponent } from './shared/component/map-new/map-new.component';
import {DistancePipe} from "./pipe/distance.pipe";
import {SearchPipe} from "./pipe/search.pipe";
import {TokenInterceptor} from "./services/classes/token.interceptor";


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
    RatingComponent,
    MapComponent,
    CreateLocationComponent,
    MapNewComponent,
    DistancePipe,
    SearchPipe
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
    NoopAnimationsModule,
    LeafletModule

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    }
  ],
  entryComponents: [
    ReviewComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
