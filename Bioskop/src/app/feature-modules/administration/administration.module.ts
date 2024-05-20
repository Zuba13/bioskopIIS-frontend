import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieProjectionsComponent } from './movie-projections/movie-projections.component';
import { MovieProjectionComponent } from './movie-projection/movie-projection.component';
import { MyReservationsComponent } from './my-reservations/my-reservations.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { EventListComponent } from './event-list/event-list.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventCreateComponent } from './event-create/event-create.component';
import { MovieReviewComponent } from './movie-review/movie-review.component';
import { MovieAllReviewsComponent } from './movie-all-reviews/movie-all-reviews.component';


@NgModule({
  declarations: [
    MovieListComponent,
    MovieProjectionsComponent,
    MovieProjectionComponent,
    MyReservationsComponent,
    EventListComponent,
    EventDetailComponent,
    EventCreateComponent,
    MovieReviewComponent,
    MovieAllReviewsComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  exports: [MovieListComponent],
})
export class AdministrationModule {}
