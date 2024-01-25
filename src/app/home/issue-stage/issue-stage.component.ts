import { Component, Input } from '@angular/core';
import { Issue } from '../../../models/issue.model';

@Component({
  selector: 'app-issue-stage',
  templateUrl: './issue-stage.component.html',
  styleUrl: './issue-stage.component.scss'
})
export class IssueStageComponent {

  @Input('issue') issue!: Issue;

  stageImage!: string;
  zoom = 12;
  center!: google.maps.LatLngLiteral;
  issueLatitude!: number;
  issueLongitude!: number;
  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPositions: google.maps.LatLngLiteral[] = [];

  ngOnInit() {
    if (this.issue) {
      this.stageImage = this.issue.issueImages[0];
    }
    this.initializeIssueLocationCoordinates();
  }

  changeMainImage(image: string) {
    this.stageImage = image;
  }

  initializeIssueLocationCoordinates() {
    console.log(this.issue);
    this.issueLatitude = Number(this.issue.issueLatitude);
    this.issueLongitude = Number(this.issue.issueLongitude);
    this.center = {
      lat: this.issueLatitude,
      lng: this.issueLongitude
    }
    this.markerPositions.push(this.center);
  }

}
