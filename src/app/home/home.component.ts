import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { issueMockData } from '../../constants';
import { MatDialog } from '@angular/material/dialog';
import { AddIssueFormComponent } from './add-issue-form/add-issue-form.component';
import { EditIssueFormComponent } from './edit-issue-form/edit-issue-form.component';
import { IssueService } from '../../services/issue.service';
import { Issue } from '../../models/issue.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  searchForm!: FormGroup
  issueMockData = issueMockData;
  issueData!: any;
  selectedIssue!: Issue;

  constructor(
    private addIssueDialog: MatDialog,
    private editIssueDialog: MatDialog,
    private issueService: IssueService
  ) {}

  ngOnInit() {
    this.initializeSearchForm();
    this.getIssues();
    setTimeout(() => {
      this.selectedIssue = this.issueData[0];
    }, 300);
  }

  onSubmit() {
    console.log(this.searchForm.value);
  }

  openAddIssueDialog() {
    this.addIssueDialog.open(AddIssueFormComponent, {
      hasBackdrop: true
    });
  }

  initializeSearchForm() {
    this.searchForm = new FormGroup({
      search: new FormControl('')
    });
  }

  getIssues() {
    this.issueService.issues$.subscribe((issues) => {
      this.issueData = issues;
    });
  }

  onIssueSelected(issue: Issue) {
    this.selectedIssue = issue;
  }

  openEditIssueDialog(issue: Issue) {
    this.editIssueDialog.open(EditIssueFormComponent, {
      hasBackdrop: true,
      data: issue
    });
  }

}
