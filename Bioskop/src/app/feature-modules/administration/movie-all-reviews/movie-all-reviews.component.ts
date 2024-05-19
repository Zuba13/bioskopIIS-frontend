import { Component, OnInit } from '@angular/core';
import { Review } from '../model/review.model';
import { Movie } from '../model/movie.model'; // Import the Movie model
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../movie.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';

@Component({
  selector: 'xp-movie-all-reviews',
  templateUrl: './movie-all-reviews.component.html',
  styleUrls: ['./movie-all-reviews.component.css'],
})
export class MovieAllReviewsComponent implements OnInit {
  reviews: Review[] = [];
  movie!: Movie; // Add a variable to store the movie details
  movieId!: number;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.movieId = Number(params.get('id'));
      this.loadReviews();
      this.loadMovie();
    });
    console.log(this.reviews);
  }

  loadReviews(): void {
    this.movieService.getReviewsByMovieId(this.movieId).subscribe((reviews) => {
      this.reviews = reviews;
      this.reviews.forEach((review) => {
        this.loadReviewDetails(review);
      });
    });
  }

  loadReviewDetails(review: Review): void {
    // Load the movie details for the review
    this.movieService.getMovieById(review.movieId).subscribe((movie) => {
      review.movie = movie;
    });

    // Load the user details for the review
    this.authService.getUserById(review.userId).subscribe((user) => {
      review.user = user;
    });
  }

  loadMovie(): void {
    this.movieService.getMovieById(this.movieId).subscribe((movie) => {
      this.movie = movie;
    });
  }
}
