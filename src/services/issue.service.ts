import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { useURL } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class IssueService {
  private issueUrl = `${useURL}/issue`;
  private issuesSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  public issues$: Observable<any> = this.issuesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.refreshIssues();
  }

  addIssue(issueData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post<any>(this.issueUrl, issueData, { headers, withCredentials: true }).pipe(
      tap(() => this.refreshIssues())
    );
  }

  getIssues(): Observable<any> {
    return this.http.get<any>(this.issueUrl, { withCredentials: true }).pipe(
      tap(issues => this.issuesSubject.next(issues))
    );
  }

  searchIssues(searchTerm: string): Observable<any> {
    return this.http.get<any>(`${this.issueUrl}?search=${searchTerm}`, { withCredentials: true }).pipe(
      tap(issues => this.issuesSubject.next(issues))
    );
  }

  refreshIssues(): void {
    this.getIssues().subscribe();
  }

  deleteIssue(issueUUID: string): Observable<any> {
    return this.http.delete<any>(`${this.issueUrl}/${issueUUID}`, { withCredentials: true }).pipe(
      tap(() => this.refreshIssues())
    );
  }

  editIssue(issueFormData: any): Observable<any> {
    return this.http.put<any>(`${this.issueUrl}/${issueFormData.issueUUID}`, issueFormData, { withCredentials: true }).pipe(
      tap(() => this.refreshIssues())
    );
  }
}
