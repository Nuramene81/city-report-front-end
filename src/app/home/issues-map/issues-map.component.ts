import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IssueService } from '../../../services/issue.service';
import { MapInfoWindow } from '@angular/google-maps';
import { CustomMarker } from '../../../models/custom-marker.model';

@Component({
  selector: 'app-issues-map',
  templateUrl: './issues-map.component.html',
  styleUrl: './issues-map.component.scss'
})
export class IssuesMapComponent implements OnInit {

  @ViewChild(MapInfoWindow, { static: false }) infoWindow!: MapInfoWindow;

  markers: CustomMarker[] = [];
  center!: google.maps.LatLngLiteral;
  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPositions: google.maps.LatLngLiteral[] = [];
  issueLatitude!: number;
  issueLongitude!: number;
  currentDisplayMarker: CustomMarker | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<IssuesMapComponent>,
    private issueService: IssueService
  ) {}

  ngOnInit() {
    this.initializeCurrentLocationCoordinates();
    this.initializeAllIssuesCoordinates();
  }

  private initializeCurrentLocationCoordinates() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      this.issueLatitude = position.coords.latitude;
      this.issueLongitude = position.coords.longitude;
      this.markerPositions.push(this.center);
    });
  }

  private initializeAllIssuesCoordinates() {
    this.issueService.getIssues().subscribe((issues) => {
      for (const issue of issues) {
        const markerPosition = {
          lat: Number(issue.issueLatitude),
          lng: Number(issue.issueLongitude)
        };
        this.markers.push({
          label: issue.title,
          imageURL: issue.issueImages[0],
          position: markerPosition as google.maps.LatLngLiteral, 
          options: {draggable: false}
        });
      }
    });
  }

  openInfoWindow(somemarker: any, markerData: any) {
    if (this.infoWindow) {
      this.currentDisplayMarker = markerData;
      this.infoWindow.open(somemarker);
    }
  }

}
