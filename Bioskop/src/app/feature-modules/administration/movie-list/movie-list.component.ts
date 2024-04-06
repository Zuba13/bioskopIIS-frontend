import { Component, OnInit } from '@angular/core';
import { Movie } from '../model/movie.model';
import { MovieService } from '../movie.service';
import { Router } from '@angular/router';
import { Projection } from '../model/projection.model';

@Component({
  selector: 'xp-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent implements OnInit {
  movies: Movie[];

  constructor(private movieService: MovieService, private router: Router) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.movieService.getMovies().subscribe((movies) => {
      this.movies = movies;
      this.fetchProjectionsForMovies();
    });
  }

  fetchProjectionsForMovies(): void {
    this.movies.forEach((movie, index) => {
      this.movieService
        .getProjectionsForMovie(movie.id)
        .subscribe((projections) => {
          this.movies[index].projections = projections;
        });
    });
  }

  goToMovieDetails(movieId: number): void {
    this.router.navigate(['/movies', movieId]);
  }

  shortenNum(num: number): string {
    if (num >= 1000) {
      return (num / 10000).toFixed(0) + 'k';
    }
    return num.toString();
  }
}
