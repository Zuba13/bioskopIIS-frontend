import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Login } from '../model/login.model';

@Component({
  selector: 'xp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  loginForm = new FormGroup({
    email: new FormControl(' ', [Validators.required, Validators.email]),
    password: new FormControl(' ', [Validators.required]),
  });

  login(): void {
    const login: Login = {
      email: this.loginForm.value.email || ' ',
      password: this.loginForm.value.password || ' ',
    };

    if (this.loginForm.valid) {
      this.authService.login(login).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
      });
    }
  }

  navigateToRegisterPage(): void {
    this.router.navigate(['/register']);
  }
}
