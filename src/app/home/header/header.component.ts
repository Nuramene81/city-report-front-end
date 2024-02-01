import { Component, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { currentUser } from '../../../models/user.model';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  @Output() openAddIssueDialog = new EventEmitter();
  @Output() logOut = new EventEmitter();

  userData!: currentUser;

  constructor(
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getUserData();
  }

  getUserData() {
    this.userService.getUserData().subscribe(data => {
      this.userData = data;
    });
  }

  onLogOut() {
    this.logOut.emit();
  }

  onOpenAddIssueDialog() {
    this.openAddIssueDialog.emit();
  }

}
