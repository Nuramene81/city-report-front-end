import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IssueService {
  private issueUrl = 'http://localhost:3000/issue';

  constructor(private http: HttpClient) { }

  addIssue(issueData: any): Observable<any> {
    return this.http.post<any>(this.issueUrl, issueData, { withCredentials: true });
  }
}
