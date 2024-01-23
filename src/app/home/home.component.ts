import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { issueMockData } from '../../constants';
import { MatDialog } from '@angular/material/dialog';
import { AddIssueFormComponent } from './add-issue-form/add-issue-form.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  searchForm!: FormGroup
  issueMockData = issueMockData;

  constructor(private dialog: MatDialog) {}

  onSubmit() {
    console.log(this.searchForm.value);
  }

  openAddIssueDialog() {
    this.dialog.open(AddIssueFormComponent, {
      hasBackdrop: true
    });
  }

}
