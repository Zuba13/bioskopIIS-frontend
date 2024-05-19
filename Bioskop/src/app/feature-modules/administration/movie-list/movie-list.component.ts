import { Component, OnInit } from '@angular/core';
import { Movie } from '../model/movie.model';
import { MovieService } from '../movie.service';
import { Router } from '@angular/router';
import { Projection } from '../model/projection.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'xp-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent implements OnInit {
  movies: Movie[];
  selectedDate: string = 'all';
  dateOptions: string[] = ['all'];
  filteredMovies: Movie[];
  genres: string[];
  selectedGenre: string = '';

  constructor(private movieService: MovieService, private router: Router) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.movieService.getMovies().subscribe((movies) => {
      this.movies = movies;
      this.filteredMovies = movies;
      this.fetchProjectionsForMovies();
    });
  }

  fetchProjectionsForMovies(): void {
    this.movies.forEach((movie, index) => {
      this.movieService
        .getProjectionsForMovie(movie.id)
        .subscribe((projections) => {
          this.movies[index].projections = projections;
          this.updateDateOptions();
          this.genres = this.getUniqueGenres();
        });
    });
  }

  goToMovieDetails(movieId: number): void {
    this.router.navigate(['/movies', movieId]);
  }

  goToMovieReviews(movieId: number): void {
    this.router.navigate(['/movie/reviews', movieId]);
  }

  updateDateOptions(): void {
    // Initialize an array to store unique future dates
    const futureDates: string[] = [];

    // Get the current date
    const currentDate = new Date();

    // Iterate through each movie
    this.movies.forEach((movie) => {
      // Get unique future dates from movie's projections
      const movieFutureDates = movie?.projections
        ?.map((projection) => projection.date)
        .filter((dateString) => new Date(dateString) > currentDate)
        .map((dateString) => this.formatDate(dateString));

      // Add unique future dates to the futureDates array
      movieFutureDates?.forEach((date) => {
        if (date && !futureDates.includes(date)) {
          futureDates.push(date);
        }
      });
    });

    // Sort future dates in ascending order
    futureDates.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

    // Add 'all' option to date options
    this.dateOptions = [...futureDates];
  }

  getUniqueGenres(): string[] {
    const uniqueGenres = new Set<string>();
    this.movies.forEach((movie) => {
      movie.genre.split(',').forEach((genre) => uniqueGenres.add(genre.trim()));
    });
    return Array.from(uniqueGenres);
  }

  filterMovies(): void {
    // Filter movies based on selected date
    let filteredByDate: Movie[];
    if (this.selectedDate === '') {
      filteredByDate = this.movies;
    } else {
      filteredByDate = this.movies.filter((movie) =>
        movie.projections?.some(
          (projection) => this.formatDate(projection.date) === this.selectedDate
        )
      );
    }

    // Filter movies based on selected genre
    if (this.selectedGenre === '') {
      // If 'All Genres' is selected, show all movies
      this.filteredMovies = filteredByDate;
    } else {
      console.log(this.filteredMovies);
      this.filteredMovies = filteredByDate.filter((movie) =>
        movie.genre.includes(this.selectedGenre)
      );
      console.log(this.filteredMovies);
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate();
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const monthIndex = date.getMonth();

    return `${day}${this.getDaySuffix(day)} ${monthNames[monthIndex]}`;
  }

  getDaySuffix(day: number): string {
    if (day >= 11 && day <= 13) {
      return 'th';
    }
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  }

  shortenNum(num: number): string {
    if (num >= 1000) {
      return (num / 10000).toFixed(0) + 'k';
    }
    return num.toString();
  }
}
