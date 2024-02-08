import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IssueService } from '../../../services/issue.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-issue-form',
  templateUrl: './add-issue-form.component.html',
  styleUrl: './add-issue-form.component.scss'
})
export class AddIssueFormComponent {
  
  addIssueForm!: FormGroup;
  selectedFiles: File[] = [];
  zoom = 12;
  center!: google.maps.LatLngLiteral;
  issueLatitude!: number;
  issueLongitude!: number;
  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPositions: google.maps.LatLngLiteral[] = [];
  isLoading = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {title: string, content: string},
    private issueService: IssueService,
    private dialogRef: MatDialogRef<AddIssueFormComponent>,
    private snackBar: MatSnackBar
    ) {}

  ngOnInit() {
    this.initializeAddIssueForm();
    this.initializeCurrentLocationCoordinates();
  }

  initializeAddIssueForm() {
    this.addIssueForm = new FormGroup({
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
      description: new FormControl(''),
      files: new FormControl(null)
    });
  }

  isInputInvalid(inputName: string) {
    return this.addIssueForm.controls[inputName].invalid && 
          !this.addIssueForm.controls[inputName].pristine &&  
          this.addIssueForm.controls[inputName].touched &&
          this.addIssueForm.controls[inputName].value
  }

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      this.selectedFiles = Array.from(files); 
    }
  }

  onSubmit() {
    this.isLoading = true;
    const formData = new FormData();
    this.selectedFiles.forEach((file, index) => {
      formData.append('images', file);
    });
    formData.append('title', this.addIssueForm.value.title);
    formData.append('description', this.addIssueForm.value.description);
    formData.append('latitude', this.issueLatitude.toString());
    formData.append('longitude', this.issueLongitude.toString());
    this.issueService.addIssue(formData).subscribe(() => {
      this.isLoading = false;
      this.snackBar.open('Issue added successfully', undefined, { duration: 3000 });
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

}
