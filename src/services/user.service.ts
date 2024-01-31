import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private signUpUrl = 'http://localhost:3000/user';
  
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getUserData().subscribe();
  }

  signUp(signUpData: any): Observable<any> {
    return this.http.post<any>(this.signUpUrl, signUpData, { withCredentials: true });
  }

  getUserData(): Observable<any> {
    return this.http.get<any>(this.signUpUrl, { withCredentials: true });
  }
}
