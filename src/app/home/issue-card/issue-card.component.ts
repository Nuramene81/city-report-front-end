import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Issue } from '../../../models/issue.model';
import { IssueService } from '../../../services/issue.service';

@Component({
  selector: 'app-issue-card',
  templateUrl: './issue-card.component.html',
  styleUrl: './issue-card.component.scss'
})

export class IssueCardComponent {

  @Input('issue') issue!: Issue;
  @Output() issueSelected = new EventEmitter<Issue>();
  @Output() editIssue = new EventEmitter<Issue>();

  constructor(private issueService: IssueService) { }

  truncateDescription(description: string, limit: number = 100): string {
    return description.length > limit ? description.substring(0, limit) + '...' : description;
  }

  onIssueClick() {
    this.issueSelected.emit(this.issue);
  }

  onIssueDelete(issueUUID: string, event: Event) {
    event.stopPropagation();
    this.issueService.deleteIssue(issueUUID).subscribe();
  }

  onIssueEdit(issue: Issue, event: Event) {
    event.stopPropagation();
    this.editIssue.emit(issue);
  }

}
