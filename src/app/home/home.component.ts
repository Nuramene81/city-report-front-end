import { Component, ViewChild} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddIssueFormComponent } from './add-issue-form/add-issue-form.component';
import { EditIssueFormComponent } from './edit-issue-form/edit-issue-form.component';
import { IssueService } from '../../services/issue.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { Issue } from '../../models/issue.model';
import { Router } from '@angular/router';
import { IssueStageComponent } from './issue-stage/issue-stage.component';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  @ViewChild('issueStage') issueStage!: IssueStageComponent;

  searchForm!: FormGroup
  issueData!: any;
  selectedIssue!: Issue;
  userData!: any;
  displayedIssueData!: Issue[];
  pageSize = 10;

  constructor(
    private addIssueDialog: MatDialog,
    private editIssueDialog: MatDialog,
    private issueService: IssueService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.initializeSearchForm();
    this.getIssues();
    setTimeout(() => {
      this.selectedIssue = this.issueData[0];
    }, 350);
    this.getUserData();
  }

  onSubmit() {
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
      if(this.issueData){
        this.displayedIssueData = this.issueData.slice(0, this.pageSize);
      }
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
    localStorage.removeItem('token');
    this.snackBar.open('Logged out');
    this.router.navigate(['/login']);
  }

  getUserData() {
    this.userService.getUserData().subscribe(data => {
      this.userData = data;
    });
  }

  pageEvent(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
  
    if(endIndex > this.issueData.length){
      endIndex = this.issueData.length;
    }
    this.displayedIssueData = this.issueData.slice(startIndex, endIndex);
  }

  setIssueStageImage() {
    return this.selectedIssue.issueImages.length ? this.selectedIssue.issueImages[0] : 'assets/images/no-image.png';
  }
}
