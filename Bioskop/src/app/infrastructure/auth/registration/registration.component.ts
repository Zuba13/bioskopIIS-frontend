import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Registration } from '../model/registration.model';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AuthenticationResponse } from '../model/authentication-response.model';
import { NotificationService } from 'src/app/feature-modules/administration/notification.service';
import { User } from '../model/user.model';

@Component({
  selector: 'xp-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  registrationForm: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  username: FormControl;
  email: FormControl;
  password: FormControl;
  confirmPassword: FormControl;
  user: User | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {
    this.createFormControls();
    this.createForm();
  }

  private createFormControls(): void {
    this.firstName = new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)],
      updateOn: 'blur', // Apply validation on blur
    });
    this.lastName = new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)],
      updateOn: 'blur', // Apply validation on blur
    });
    this.username = new FormControl('', {
      validators: [Validators.required, Validators.minLength(5)],
      updateOn: 'blur', // Apply validation on blur
    });
    this.email = new FormControl('', {
      validators: [Validators.required, Validators.email],
      updateOn: 'blur', // Apply validation on blur
    });
    this.password = new FormControl('', {
      validators: [Validators.required, Validators.minLength(8)],
      updateOn: 'blur', // Apply validation on blur
    });
    this.confirmPassword = new FormControl('', {});
  }

  private createForm(): void {
    this.registrationForm = this.formBuilder.group({
      firstName: this.firstName,
      lastName: this.lastName,
      username: this.username,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
    });
  }

  register(): void {
    if (this.registrationForm.valid) {
      const registration: Registration = {
        firstName: this.registrationForm.value.firstName,
        lastName: this.registrationForm.value.lastName,
        email: this.registrationForm.value.email,
        username: this.registrationForm.value.username,
        password: this.registrationForm.value.password,
      };

      this.authService.register(registration).subscribe({
        next: () => {
          this.router.navigate(['/home']);
          this.notificationService.openSuccessSnackBar(
            'User successfully registred. Please sign in in order to access your account.'
          );
        },
        error: (error) => {
          console.error('Registration failed:', error);
        },
      });
    }
  }

  registerCashier(): void {
    if (this.registrationForm.valid) {
      const registration: Registration = {
        firstName: this.registrationForm.value.firstName,
        lastName: this.registrationForm.value.lastName,
        email: this.registrationForm.value.email,
        username: this.registrationForm.value.username,
        password: this.registrationForm.value.password,
      };

      this.authService.registerCashier(registration).subscribe({
        next: () => {
          this.router.navigate(['/home']);
          this.notificationService.openSuccessSnackBar(
            'User successfully registred. Please sign in in order to access your account.'
          );
        },
        error: (error) => {
          console.error('Registration failed:', error);
        },
      });
    }
  }
  navigateToLoginPage(): void {
    this.router.navigate(['/login']);
  }

  private passwordsMatchValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confirmPassword');

    if (!passwordControl || !confirmPasswordControl) {
      return null;
    }

    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ passwordMismatch: true });
      return;
    } else {
      confirmPasswordControl.setErrors(null);
      return;
    }
  }

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user;
      console.log(user);
    });
  }
}
