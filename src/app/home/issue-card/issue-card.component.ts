import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Issue } from '../../../models/issue.model';

@Component({
  selector: 'app-issue-card',
  templateUrl: './issue-card.component.html',
  styleUrl: './issue-card.component.scss'
})
export class IssueCardComponent {

  @Input('issue') issue!: Issue;
  @Output() issueSelected = new EventEmitter<Issue>();

  truncateDescription(description: string, limit: number = 100): string {
    return description.length > limit ? description.substring(0, limit) + '...' : description;
  }

  onIssueClick() {
    this.issueSelected.emit(this.issue);
  }

}
