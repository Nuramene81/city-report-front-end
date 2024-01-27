import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IssueService {
  private issueUrl = 'http://localhost:3000/issue';
  private issuesSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  public issues$: Observable<any> = this.issuesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.refreshIssues();
  }

  addIssue(issueData: any): Observable<any> {
    return this.http.post<any>(this.issueUrl, issueData, { withCredentials: true }).pipe(
      tap(() => this.refreshIssues())
    );
  }

  getIssues(): Observable<any> {
    return this.http.get<any>(this.issueUrl, { withCredentials: true }).pipe(
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
