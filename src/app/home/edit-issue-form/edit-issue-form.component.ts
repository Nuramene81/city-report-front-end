import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IssueService } from '../../../services/issue.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Issue } from '../../../models/issue.model';

@Component({
  selector: 'app-edit-issue-form',
  templateUrl: './edit-issue-form.component.html',
  styleUrl: './edit-issue-form.component.scss'
})
export class EditIssueFormComponent {

  editIssueForm!: FormGroup;
  selectedFiles: File[] = [];
  zoom = 12;
  center!: google.maps.LatLngLiteral;
  issueLatitude!: number;
  issueLongitude!: number;
  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPositions: google.maps.LatLngLiteral[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Issue,
    private issueService: IssueService,
    private dialogRef: MatDialogRef<EditIssueFormComponent>
    ) {}

  ngOnInit() {
    this.initializeEditIssueForm();
    this.initializeCurrentLocationCoordinates();
    this.populateFormWithCurrentValues();
  }

  initializeEditIssueForm() {
    this.editIssueForm = new FormGroup({
      title: new FormControl(
        null, 
        { validators: [
            Validators.required, 
            Validators.minLength(2),
            Validators.maxLength(50),
            Validators.pattern('^[a-zA-Z0-9 \-\']+$')
          ], 
          updateOn: 'blur' 
        }
      ),
      description: new FormControl('')
    });
  }

  isInputInvalid(inputName: string) {
    return this.editIssueForm.controls[inputName].invalid && 
          !this.editIssueForm.controls[inputName].pristine &&  
          this.editIssueForm.controls[inputName].touched &&
          this.editIssueForm.controls[inputName].value
  }

  onSubmit() {
    console.log(this.issueLatitude, this.issueLongitude);
    const formData = {
      issueUUID: this.data.issueUUID,
      title: this.editIssueForm.value.title,
      description: this.editIssueForm.value.description,
      issueLatitude: this.issueLatitude.toString(),
      issueLongitude: this.issueLongitude.toString()
    }
    this.issueService.editIssue(formData).subscribe(() => {
      this.dialogRef.close();
    });
  }

  mapClick(event: any) {
    this.issueLatitude = event.latLng.lat();
    this.issueLongitude = event.latLng.lng();
    if (event.latLng) {
      this.markerPositions.length = 0;
      this.markerPositions.push(event.latLng.toJSON());
    }
  }

  initializeCurrentLocationCoordinates() {
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

  populateFormWithCurrentValues() {
    setTimeout(() => {
      this.editIssueForm.setValue({
        title: this.data.title,
        description: this.data.description
      });
    }, 500);
  }
}

