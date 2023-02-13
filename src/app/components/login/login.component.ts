import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginFailed = false;
  errorMsg = '';

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.createLoginForm();
  }

  private createLoginForm() {
    this.loginForm = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.pattern('^([a-zA-Z]+[0-9]|[0-9]+[a-zA-Z])[a-zA-Z0-9]*$'),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  
  onLogin() {
    this.authenticationService
      .authenticate(this.loginForm.value.username)
      .subscribe(
        (user_data) => {
          if (
            user_data.username === this.loginForm.value.username &&
            user_data.password === this.loginForm.value.password
          ) {
            this.router.navigate(['/home'], { relativeTo: this.route });
          } else {
            this.loginFailed = true;
            this.errorMsg = "Username or password doesn't match";
          }
        },
        (error) => {
          console.log(error['message']);
        }
      );
  }
}