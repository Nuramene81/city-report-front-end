import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { issueMockData } from '../../constants';
import { MatDialog } from '@angular/material/dialog';
import { AddIssueFormComponent } from './add-issue-form/add-issue-form.component';
import { IssueService } from '../../services/issue.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  searchForm!: FormGroup
  issueMockData = issueMockData;
  issueData!: any;

  constructor(
    private dialog: MatDialog,
    private issueService: IssueService
  ) {}

  ngOnInit() {
    this.initializeSearchForm();
    this.getIssues();
  }

  onSubmit() {
    console.log(this.searchForm.value);
  }

  openAddIssueDialog() {
    this.dialog.open(AddIssueFormComponent, {
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

}
