import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, timer} from 'rxjs';

import {mergeMap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class HttpService {
  readonly URL_API = '/api/locations';
  readonly URL_API_ADMIN = '/api/admin';
  constructor(private http: HttpClient) {}
  //
  public create(location: any): Observable<any> {
    return this.http.post(`${this.URL_API}`, location);
  }

  // todo оставить этот код
  public getLocation(locationId: string): Observable<any> {
    return this.http.get(`${this.URL_API}/${locationId}`);
  }
  // todo убрать задержку
  // public getLocation(locationId: string): Observable<any> {
  //   return timer(1000).pipe(
  //     mergeMap(() => this.http.get(`${this.URL_API}/${locationId}`))
  //   );
  // }
  //
  // public deleteLink(link: string): Observable<any> {
  //   return this.http.delete(`${this.URL_API}/${link}`)
  // }
  //
  public getAllLocations(): Observable<any> {
    return this.http.get(`${this.URL_API}`);
  }
  public getAllLocationsParams(latitude: string, longitude: string): Observable<any> {
    const params = new HttpParams()
      .set('latitude', latitude)
      .set('longitude', longitude);
    return this.http.get(`${this.URL_API}`, {params});
  }
  public createReview(locationId: string, review: any): Observable<any> {
    return this.http.post(`${this.URL_API}/${locationId}/reviews`, review);
  }
  public createCoordLocation(locationId: string, coords: [number, number]): Observable<any> {
    return this.http.post(`${this.URL_API}/${locationId}/coords`, coords);
  }
  public createFacilities(name: string): Observable<any> {
    return this.http.post(`${this.URL_API_ADMIN}/facilities`, name);
  }
  public getFacilities(): Observable<any> {
    return this.http.get(`${this.URL_API_ADMIN}/facilities`);
  }
}
