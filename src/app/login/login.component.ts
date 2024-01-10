import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { LogoComponent } from '../logo/logo.component';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit {
  loginForm!: FormGroup
  showPassword = false;
  isLoginDetailsValid = true;

  constructor(
    private userService: UserService,
    private router: Router
    ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
  }

  onSubmit() {
    this.userService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    }).subscribe((res) => {
        console.log(res);
        if (res.message === 'Login Successful!') {
          this.isLoginDetailsValid = true;
          this.router.navigate(['/']);
        } else {
          this.isLoginDetailsValid = false;
        }
        console.log(this.isLoginDetailsValid);
      });
      
  }
}
