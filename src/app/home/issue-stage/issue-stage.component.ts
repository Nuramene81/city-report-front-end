import { Component, Input, SimpleChanges } from '@angular/core';
import { Issue } from '../../../models/issue.model';

@Component({
  selector: 'app-issue-stage',
  templateUrl: './issue-stage.component.html',
  styleUrl: './issue-stage.component.scss'
})
export class IssueStageComponent {

  @Input('issue') issue!: Issue;
  @Input('stageImage') stageImage!: string;
  @Input('issueLatitude') issueLatitude!: string;
  @Input('issueLongitude') issueLongitude!: string;

  zoom = 12;
  center!: google.maps.LatLngLiteral;
  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPositions: google.maps.LatLngLiteral[] = [];

  ngOnInit() {
    this.initializeIssueLocationCoordinates();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['issueLatitude'] || changes['issueLongitude']) {
      this.refreshMap();
    }
  }

  changeMainImage(image: string) {
    this.stageImage = image;
  }

  initializeIssueLocationCoordinates() {
    setTimeout(() => {
      this.center = {
        lat: Number(this.issueLatitude),
        lng: Number(this.issueLongitude)
      };
      this.markerPositions = [{...this.center}];
    }, 300);
  }

  refreshMap() {
    this.center = {
      lat: Number(this.issueLatitude),
      lng: Number(this.issueLongitude)
    };
    this.markerPositions = [{...this.center}];
  }
}
