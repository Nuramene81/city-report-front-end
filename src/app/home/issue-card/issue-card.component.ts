import { Component, Input } from '@angular/core';
import { Issue } from '../../../models/issue.model';

@Component({
  selector: 'app-issue-card',
  templateUrl: './issue-card.component.html',
  styleUrl: './issue-card.component.scss'
})
export class IssueCardComponent {

  @Input('issue') issue!: Issue;

}
