import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/feature-modules/layout/home/home.component';
import { LoginComponent } from '../auth/login/login.component';
import { AuthGuard } from '../auth/auth.guard';
import { RegistrationComponent } from '../auth/registration/registration.component';
import { MovieListComponent } from 'src/app/feature-modules/administration/movie-list/movie-list.component';
import { MovieProjectionsComponent } from 'src/app/feature-modules/administration/movie-projections/movie-projections.component';
import { MovieProjectionComponent } from 'src/app/feature-modules/administration/movie-projection/movie-projection.component';
import { EditProfileComponent } from '../auth/edit-profile/edit-profile.component';
import { MyReservationsComponent } from 'src/app/feature-modules/administration/my-reservations/my-reservations.component';
import { MovieReviewComponent } from 'src/app/feature-modules/administration/movie-review/movie-review.component';
import { MovieAllReviewsComponent } from 'src/app/feature-modules/administration/movie-all-reviews/movie-all-reviews.component';
import { SupplierRegistrationComponent } from 'src/app/feature-modules/food-beverage/supplier-registration/supplier-registration.component';
import { SupplierContractComponent } from 'src/app/feature-modules/food-beverage/supplier-contract/supplier-contract.component';
import { BaseContractDataFormComponent } from 'src/app/feature-modules/food-beverage/supplier-contract/base-contract-data-form/base-contract-data-form.component';
import { ContractOverviewComponent } from 'src/app/feature-modules/food-beverage/supplier-contract/contract-overview/contract-overview.component';
import { ContractsTableComponent } from 'src/app/feature-modules/food-beverage/supplier-contract/contracts-table/contracts-table.component';
import { SuppliersTableComponent } from 'src/app/feature-modules/food-beverage/supplier-contract/suppliers-table/suppliers-table.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  {
    path: 'movie-list',
    component: MovieListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'movies/:id',
    component: MovieProjectionsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'projection/:id',
    component: MovieProjectionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: EditProfileComponent,
  },
  {
    path: 'my-tickets',
    component: MyReservationsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'movie-review/:id',
    component: MovieReviewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'movie/reviews/:id',
    component: MovieAllReviewsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'supplier-register',
    component: SupplierRegistrationComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'supplier-contract',
    component: SupplierContractComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'contracts',
    component: ContractsTableComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'suppliers',
    component: SuppliersTableComponent,
    // canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
