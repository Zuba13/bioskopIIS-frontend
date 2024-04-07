import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../movie.service';
import { Projection } from '../model/projection.model';
import { Hall } from '../model/hall.model';
import { Movie } from '../model/movie.model';

@Component({
  selector: 'xp-movie-projection',
  templateUrl: './movie-projection.component.html',
  styleUrls: ['./movie-projection.component.css'],
})
export class MovieProjectionComponent implements OnInit {
  projectionId: number;
  projection: Projection;
  hall: Hall;
  movie: Movie;
  hallNumberOfRowsArray: any[];
  hallSeatsPerRowArray: any[];
  selectedSeats: boolean[][];

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {
    this.selectedSeats = [];
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.projectionId = +params['id'];
      this.getProjectionAndHall();
    });
  }

  getProjectionAndHall(): void {
    this.movieService
      .getProjectionById(this.projectionId)
      .subscribe((projection) => {
        this.projection = projection;
        this.movieService.getHallById(projection.hallId).subscribe((hall) => {
          this.hall = hall;
          this.initializeSeatArrays();
        });
        // Fetch the associated movie
        this.movieService
          .getMovieById(projection.movieId)
          .subscribe((movie) => {
            this.movie = movie;
          });
      });
  }

  initializeSeatArrays(): void {
    if (this.hall) {
      this.hallNumberOfRowsArray = Array(this.hall.numberOfRows).fill(0);
      this.hallSeatsPerRowArray = Array(this.hall.seatsPerRow).fill(0);
      this.selectedSeats = Array.from({ length: this.hall.numberOfRows }, () =>
        Array(this.hall.seatsPerRow).fill(false)
      );
    }
  }

  toggleSeatSelection(row: number, seat: number): void {
    this.selectedSeats[row][seat] = !this.selectedSeats[row][seat];
  }

  isSeatSelected(row: number, seat: number): boolean {
    return this.selectedSeats[row][seat];
  }

  countSelectedSeats(): number {
    let count = 0;
    this.selectedSeats.forEach((row) => {
      row.forEach((seat) => {
        if (seat) {
          count++;
        }
      });
    });
    return count;
  }

  calculateTotalPrice(): number {
    return this.countSelectedSeats() * this.projection.price;
  }
}
