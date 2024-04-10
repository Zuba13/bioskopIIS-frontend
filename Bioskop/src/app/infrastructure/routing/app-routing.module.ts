import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/feature-modules/layout/home/home.component';
import { LoginComponent } from '../auth/login/login.component';
import { AuthGuard } from '../auth/auth.guard';
import { RegistrationComponent } from '../auth/registration/registration.component';
import { MovieListComponent } from 'src/app/feature-modules/administration/movie-list/movie-list.component';
import { MovieProjectionsComponent } from 'src/app/feature-modules/administration/movie-projections/movie-projections.component';
import { MovieProjectionComponent } from 'src/app/feature-modules/administration/movie-projection/movie-projection.component';
import { MyReservationsComponent } from 'src/app/feature-modules/administration/my-reservations/my-reservations.component';

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
    path: 'my-tickets',
    component: MyReservationsComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
