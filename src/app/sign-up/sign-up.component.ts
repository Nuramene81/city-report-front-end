import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LogoComponent } from '../logo/logo.component';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    LogoComponent,
    HttpClientModule
  ],
  providers: [
    UserService
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private userService: UserService
    ) { }

  ngOnInit() {
    this.initializeSignUpForm();
  }

  initializeSignUpForm() {
    this.signUpForm = new FormGroup({
      email: new FormControl(
        null, 
        { validators: [
            Validators.required, 
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
          ], 
          updateOn: 'blur' 
        }
      ),
      fullName: new FormControl(
        '', 
        { validators: [
            Validators.required, 
            Validators.minLength(2),
            Validators.maxLength(50),
            Validators.pattern('^[a-zA-Z \-\']+$')
          ], 
          updateOn: 'blur' 
        }
      ),
      username: new FormControl(
        '', 
        { validators: [
            Validators.required, 
            Validators.minLength(5),
            Validators.maxLength(20),
            Validators.pattern('^[a-zA-Z0-9_-]+$')
          ], 
          updateOn: 'blur' 
        }
      ),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(128)
      ]),
      confirmPassword: new FormControl('', [
        Validators.required
      ])
    });
  }

  isInputInvalid(inputName: string) {
    return this.signUpForm.controls[inputName].invalid && 
          !this.signUpForm.controls[inputName].pristine &&  
          this.signUpForm.controls[inputName].touched &&
          this.signUpForm.controls[inputName].value
  }

  onSubmit() {
    console.log(this.signUpForm.value);
    this.userService.test().subscribe(
      (res) => {
        console.log(res);
      });
  }
}
