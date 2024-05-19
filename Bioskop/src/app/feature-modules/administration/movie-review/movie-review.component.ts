import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../movie.service';
import { Movie } from '../model/movie.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'xp-movie-review',
  templateUrl: './movie-review.component.html',
  styleUrls: ['./movie-review.component.css'],
})
export class MovieReviewComponent implements OnInit {
  movie: Movie | undefined;
  rating: number = 0;
  hovered: number = 0;
  comment: string = '';
  stars: boolean[] = Array(10).fill(false); // Array for 10 stars

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.getMovieById(Number(id));
      }
    });
  }
  clickedBtn(): void {
    console.log('KLIK');
  }

  getMovieById(id: number): void {
    this.movieService.getMovieById(id).subscribe({
      next: (movie) => {
        this.movie = movie;
      },
      error: (err) => {
        console.error('Error fetching movie', err);
      },
    });
  }

  rate(rating: number): void {
    this.rating = rating;
  }

  hover(rating: number): void {
    this.hovered = rating;
  }

  leave(): void {
    this.hovered = 0;
  }

  submitReview(): void {
    if (this.rating && this.comment) {
      const review = {
        movieId: this.movie?.id || 0,
        userId: this.authService.user$.value.id,
        rating: this.rating,
        comment: this.comment,
      };

      this.movieService.createReview(review).subscribe({
        next: (createdReview) => {
          // Handle success
          console.log('Review created successfully:', createdReview);
          this.router.navigate(['/']);
          // Optionally, you can navigate to a different page or perform other actions upon successful review creation
        },
        error: (error) => {
          // Handle error
          console.error('Error creating review:', error);
          // Optionally, display an error message to the user or perform other error handling actions
        },
      });
    } else {
      // Optionally, display a message to the user indicating that both rating and comment are required
    }
  }
}
