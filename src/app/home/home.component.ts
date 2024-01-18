import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { issueMockData } from '../../constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  searchForm!: FormGroup
  issueMockData = issueMockData;

  onSubmit() {
    console.log(this.searchForm.value);
  }

}
