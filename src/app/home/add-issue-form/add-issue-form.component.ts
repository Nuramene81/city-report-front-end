import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-issue-form',
  templateUrl: './add-issue-form.component.html',
  styleUrl: './add-issue-form.component.scss'
})
export class AddIssueFormComponent {
  addIssueForm!: FormGroup;
  selectedFiles: File[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: {title: string, content: string}) {}

  ngOnInit() {
    this.initializeAddIssueForm();
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

      for (const file of this.selectedFiles) {
        console.log(file);
      }
    }
  }

  onSubmit() {
    const formData = new FormData();
    this.selectedFiles.forEach((file, index) => {
      formData.append('images', file);
    });
    formData.append('title', this.addIssueForm.value.title);
    formData.append('description', this.addIssueForm.value.description);
    formData.forEach((value, key) => {
      console.log(key + ', ' + value);
    });
  }

}
