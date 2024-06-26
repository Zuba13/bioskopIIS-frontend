import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Login } from '../model/login.model';
import { NotificationService } from 'src/app/feature-modules/administration/notification.service';

@Component({
  selector: 'xp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService
  ) {}

  loginForm: FormGroup;
  badCreds: boolean = false;

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  navigateToRegisterPage(): void {
    this.router.navigate(['/register']);
  }

  login(): void {
    this.badCreds = false;
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;

      this.authService.login({ username, password }).subscribe(
        (response) => {
          this.router.navigate(['/home']);
          this.notificationService.openSuccessSnackBar(
            `${username} successfully logged in.`
          );
        },
        (error) => {
          console.error('Login failed:', error);
          this.badCreds = true;
        }
      );
    } else {
      console.log('Invalid form');
    }
  }

  isFieldEmpty(): boolean {
    return (
      !this.loginForm.get('username')?.value ||
      !this.loginForm.get('password')?.value
    );
  }
}
