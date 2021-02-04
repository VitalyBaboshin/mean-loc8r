import {Injectable} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {observable, Observable, Subject} from "rxjs";
import {tap} from "rxjs/operators";
import {User} from "./interfaces";

@Injectable({
  providedIn: "root"
})
export class AuthServices {
  private token = null;
  private userId = null;
  private userName = null;
  private storageName = 'userData';

  auth$ = new Subject<boolean>();
  name$ = new Subject<string>();

  constructor(private http: HttpClient) {
    this.getStateLocalStorage();
  }

  register(user: User): Observable<HttpResponse<any>> {
    return this.http.post<User>('/api/auth/register', user, {observe: "response"})
  }

  login(user: User): Observable<{token: string, userId: string, userName: string}> {
    return this.http.post<{token: string, userId: string, userName: string}>('/api/auth/login', user)
      .pipe(
        tap(
          ({token, userId, userName}) => {
            localStorage.setItem(this.storageName, JSON.stringify({userId, token, userName}));
            this.setToken(token);
            this.setUserId(userId);
            this.setUserName(userName)
          }
        )
      )
  }

  getStateLocalStorage(): void {
    if (localStorage.getItem('userData')) {
      const userData = JSON.parse(localStorage.getItem('userData'));
      this.token = userData.token;
      this.userName = userData.userName;


    } else {
      this.setToken(null);
      this.setUserName(null);
    }
  }
  private subAuth():void {
    this.auth$.next(!!this.token);
  }
  private subName(): void {
    this.name$.next(this.getName())
  }
  setToken(token: string): void {
    this.token = token;
    this.subAuth();
  }
  setUserId(userId: string): void {
    this.userId = userId;
  }
  setUserName(userName: string): void {
    this.userName = userName;
    this.subName();
  }

  getToken(): string {
    return this.token;
  }
  getName(): string{
    return this.userName;
  }

  isAuthenticated(): boolean {
    this.getStateLocalStorage();
    return !!this.token;
  }

  logout() {
    this.setToken(null);
    this.setUserId(null);
    this.setUserName(null);
    localStorage.clear();
  }
}
