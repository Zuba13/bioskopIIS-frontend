import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieProjectionsComponent } from './movie-projections/movie-projections.component';

@NgModule({
  declarations: [MovieListComponent, MovieProjectionsComponent],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  exports: [MovieListComponent],
})
export class AdministrationModule {}
