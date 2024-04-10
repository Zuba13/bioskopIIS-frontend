import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../model/user.model';
import { Registration } from '../model/registration.model';

@Component({
  selector: 'xp-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  user: User;
  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  editProfileForm: FormGroup;
  badCreds: boolean = false;

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user;
      this.initializeForm();
    });
  }

  navigateToRegisterPage(): void {
    this.router.navigate(['/home']);
  }

  initializeForm(): void {
    this.editProfileForm = this.formBuilder.group({
      firstName: [this.user?.firstName, Validators.required],
      lastName: [this.user?.lastName, Validators.required],
      username: [this.user?.username, Validators.required],
      email: [this.user?.email, [Validators.required, Validators.email]]
    });
  }


  updateProfile(): void {
    if (this.editProfileForm.valid) {
      const updatedProfile: User = {
        firstName: this.editProfileForm.value.firstName,
        lastName: this.editProfileForm.value.lastName,
        email: this.editProfileForm.value.email,
        username: this.editProfileForm.value.username,
        id: this.user.id,
        money: this.user.money,
        role: this.user.role
      };

      this.authService.updateProfile(updatedProfile, this.user.id).subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Update profile failed:', error);
        },
      });
    }
  }
}
