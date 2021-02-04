import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, timer} from "rxjs";
import {AuthServices} from "./auth.services";
import {mergeMap} from "rxjs/operators";


@Injectable({
  providedIn: "root"
})

export class HttpService {
  readonly URL_API = "/api/locations"
  constructor(private http: HttpClient) {}
  //
  public create(location: any): Observable<any> {
    return this.http.post(`${this.URL_API}`, location)
  }

  //todo оставить этот код
  // public getLocation(locationId: string): Observable<any> {
  //   return this.http.get(`${this.URL_API}/${locationId}`)
  // }
  //todo убрать задержку
  public getLocation(locationId: string): Observable<any> {
    return timer(1000).pipe(
      mergeMap(() => this.http.get(`${this.URL_API}/${locationId}`))
    )
  }
  //
  // public deleteLink(link: string): Observable<any> {
  //   return this.http.delete(`${this.URL_API}/${link}`)
  // }
  //
  public getAllLocations(): Observable<any> {
    return this.http.get(`${this.URL_API}`)
  }
  public createReview(locationId: string, review: any): Observable<any> {
    return this.http.post(`${this.URL_API}/${locationId}/reviews`, review)
  }
}