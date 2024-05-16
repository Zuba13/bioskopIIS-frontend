import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { NotificationService } from '../../administration/notification.service';
import { SupplierService } from '../services/supplier.service';

@Component({
  selector: 'xp-supplier-registration',
  templateUrl: './supplier-registration.component.html',
  styleUrls: ['./supplier-registration.component.css'],
})
export class SupplierRegistrationComponent {
  supplierRegistrationForm: FormGroup;
  name: FormControl;
  email: FormControl;
  street: FormControl;
  city: FormControl;
  country: FormControl;
  phone: FormControl;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private supplierService: SupplierService,
    private notificationService: NotificationService
  ) {
    this.createFormControls();
    this.createForm();
  }

  private createFormControls(): void {
    this.name = new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)],
      updateOn: 'blur',
    });
    this.email = new FormControl('', {
      validators: [Validators.required, Validators.email],
      updateOn: 'blur',
    });
    this.street = new FormControl('', {
      validators: [Validators.required, Validators.minLength(5)],
      updateOn: 'blur',
    });
    this.city = new FormControl('', {
      validators: [Validators.required, Validators.minLength(2)],
      updateOn: 'blur',
    });
    this.country = new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)],
      updateOn: 'blur',
    });
    this.phone = new FormControl('', {
      validators: [Validators.required, Validators.minLength(9)],
      updateOn: 'blur',
    });
  }

  private createForm(): void {
    this.supplierRegistrationForm = this.formBuilder.group({
      name: this.name,
      email: this.email,
      street: this.street,
      city: this.city,
      country: this.country,
      phone: this.phone,
    });
  }

  register(): void {
    if (this.supplierRegistrationForm.valid) {
      this.supplierService
        .registerSupplier(this.supplierRegistrationForm.getRawValue())
        .subscribe({
          next: () => {
            this.router.navigate(['/home']);
            this.notificationService.openSuccessSnackBar(
              'Supplier successfully registred.'
            );
          },
          error: (error) => {
            console.error('Registration failed:', error);
          },
        });
    }
  }
}
