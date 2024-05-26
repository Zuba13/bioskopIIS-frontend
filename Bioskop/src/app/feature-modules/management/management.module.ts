import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MovieCatalogComponent } from './movie-catalog/movie-catalog.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [
    MovieCatalogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatFormFieldModule
  ],
  exports: [
    MovieCatalogComponent
  ],
})
export class ManagementModule {}
