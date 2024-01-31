import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:3000/login';
  private authUrl = 'http://localhost:3000/auth';
  private logoutURL = 'http://localhost:3000/auth/logout';

  constructor(private http: HttpClient) { }

  login(loginData: any): Observable<any> {
    return this.http.post<any>(this.loginUrl, loginData, { withCredentials: true });
  }

  getIsLoggedIn(): Observable<any> {
    return this.http.get<any>(this.authUrl, { withCredentials: true });
  } 

  logout(): Observable<any> {
    return this.http.get<any>(this.logoutURL, { withCredentials: true });
  }

  
}
