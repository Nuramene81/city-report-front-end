import { Component} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { issueMockData } from '../../constants';
import { MatDialog } from '@angular/material/dialog';
import { AddIssueFormComponent } from './add-issue-form/add-issue-form.component';
import { EditIssueFormComponent } from './edit-issue-form/edit-issue-form.component';
import { IssueService } from '../../services/issue.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { Issue } from '../../models/issue.model';
import { Router } from '@angular/router';

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
  userData!: any;

  constructor(
    private addIssueDialog: MatDialog,
    private editIssueDialog: MatDialog,
    private issueService: IssueService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initializeSearchForm();
    this.getIssues();
    setTimeout(() => {
      this.selectedIssue = this.issueData[0];
    }, 300);
    this.getUserData();
  }

  onSubmit() {
    console.log(this.searchForm.value);
    this.searchIssues();
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

  searchIssues() {
    this.issueService.searchIssues(this.searchForm.value.search).subscribe();
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

  logOut() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

  getUserData() {
    this.userService.getUserData().subscribe(data => {
      this.userData = data;
      console.log(this.userData);
    });
  }

}
