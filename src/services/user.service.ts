import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private signUpUrl = 'http://localhost:3000/user';
  private loginUrl = 'http://localhost:3000/login';

  constructor(private http: HttpClient) { }

  signUp(signUpData: any): Observable<any> {
    return this.http.post<any>(this.signUpUrl, signUpData);
  }
  
  login(loginData: any): Observable<any> {
    return this.http.post<any>(this.loginUrl, loginData);
  }

  test(): Observable<any> {
    return this.http.get<any>(`${this.signUpUrl}`);
  }
}
