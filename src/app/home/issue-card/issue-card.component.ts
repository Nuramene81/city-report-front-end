import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Issue } from '../../../models/issue.model';
import { IssueService } from '../../../services/issue.service';
import { currentUser } from '../../../models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-issue-card',
  templateUrl: './issue-card.component.html',
  styleUrl: './issue-card.component.scss'
})

export class IssueCardComponent {

  @Input('issue') issue!: Issue;
  @Input('user') userData!: currentUser;
  @Output() issueSelected = new EventEmitter<Issue>();
  @Output() editIssue = new EventEmitter<Issue>();

  isLoading = false;

  constructor(
    private issueService: IssueService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  truncateDescription(description: string, limit: number = 100): string {
    return description.length > limit ? description.substring(0, limit) + '...' : description;
  }

  onIssueClick() {
    this.issueSelected.emit(this.issue);
  }

  onIssueDelete(issueUUID: string, event: Event) {
    this.isLoading = true;
    event.stopPropagation();
    this.issueService.deleteIssue(issueUUID).subscribe(() => {
      this.isLoading = false;
      this.snackBar.open('Issue deleted', undefined, { duration: 3000 });
    });
  }

  onIssueEdit(issue: Issue, event: Event) {
    event.stopPropagation();
    this.editIssue.emit(issue);
  }
}
