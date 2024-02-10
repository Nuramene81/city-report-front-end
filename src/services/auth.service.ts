import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { useURL } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = `${useURL}/login`;
  private authUrl = `${useURL}/auth`;
  private logoutURL = `${useURL}/auth/logout`;

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
