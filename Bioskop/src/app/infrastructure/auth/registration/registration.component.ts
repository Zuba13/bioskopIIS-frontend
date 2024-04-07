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

  constructor(private formBuilder: FormBuilder, private router: Router) {
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
    console.log('registracija');
    if (this.registrationForm.valid) {
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
}
