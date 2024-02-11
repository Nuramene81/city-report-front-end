import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup
  showPassword = false;
  showConfirmPassword = false;
  isPasswordMatching = true;

  constructor(
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
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
    this.isConfirmPasswordMatching();
    if(this.isPasswordMatching && this.signUpForm.valid){
      this.userService.signUp({
        email: this.signUpForm.value.email,
        fullName: this.signUpForm.value.fullName,
        username: this.signUpForm.value.username,
        password: this.signUpForm.value.password
      }).subscribe(
        (res) => {
          console.log(res);
          localStorage.setItem('token', res.token);
          this.snackBar.open(
            'Account created successfully!', 
            undefined, 
            { duration: 3000 }
          );
          this.router.navigate(['/']);
        });
    }
  }

  isConfirmPasswordMatching() {
    this.isPasswordMatching = this.signUpForm.controls['confirmPassword'].value === this.signUpForm.controls['password'].value
  }
}
