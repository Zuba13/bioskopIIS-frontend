import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../movie.service';
import { Movie } from '../model/movie.model';
import { Projection } from '../model/projection.model';

@Component({
  selector: 'xp-movie-projections',
  templateUrl: './movie-projections.component.html',
  styleUrls: ['./movie-projections.component.css'],
})
export class MovieProjectionsComponent implements OnInit {
  movie: Movie; // Variable to store the movie details
  projections: Projection[]; // Variable to store movie projections

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Retrieve the movie ID from the route parameters
    const movieId = this.route.snapshot.params['id'];

    // Fetch movie details using MovieService
    this.movieService.getMovieById(movieId).subscribe((movie: Movie) => {
      this.movie = movie;

      // Fetch projections for the movie
      this.movieService
        .getProjectionsForMovie(movieId)
        .subscribe((projections: any[]) => {
          this.projections = projections;
        });
    });
  }

  navigateToProjectionDetails(projectionId: number): void {
    this.router.navigateByUrl(`/projection/${projectionId}`);
  }

  // Method to group projections by date
  groupProjectionsByDate(projections: any[]): any[] {
    const groups: { [date: string]: any[] } = {}; // Explicitly define the structure of groups object
    projections.forEach((projection) => {
      const date = projection.date.split('T')[0]; // Extract date from ISO string
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(projection);
    });
    return Object.keys(groups).map((date) => ({
      date: new Date(date),
      projections: groups[date],
    }));
  }
}
