import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private signUpUrl = 'http://localhost:3000/user';

  constructor(private http: HttpClient) { }

  signUp(signUpData: any): Observable<any> {
    return this.http.post<any>(this.signUpUrl, signUpData, { withCredentials: true });
  }
  
}
