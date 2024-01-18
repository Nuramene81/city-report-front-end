import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
  }

  onSubmit() {
    this.authService.login({
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
