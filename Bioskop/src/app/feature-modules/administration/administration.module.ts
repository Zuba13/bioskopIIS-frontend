import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieProjectionsComponent } from './movie-projections/movie-projections.component';
import { MovieProjectionComponent } from './movie-projection/movie-projection.component';
import { MyReservationsComponent } from './my-reservations/my-reservations.component';

@NgModule({
  declarations: [
    MovieListComponent,
    MovieProjectionsComponent,
    MovieProjectionComponent,
    MyReservationsComponent,
  ],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  exports: [MovieListComponent],
})
export class AdministrationModule {}
