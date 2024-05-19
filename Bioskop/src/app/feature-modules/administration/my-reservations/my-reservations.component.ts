import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { Ticket } from '../model/ticket.model';
import { Projection } from '../model/projection.model';
import { Movie } from '../model/movie.model';
import { forkJoin } from 'rxjs';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'xp-my-reservations',
  templateUrl: './my-reservations.component.html',
  styleUrls: ['./my-reservations.component.css'],
})
export class MyReservationsComponent implements OnInit {
  tickets: Ticket[] = [];
  upcomingTickets: Ticket[] = [];
  pastTickets: Ticket[] = [];
  loadedTicketsCount = 0;
  activeTab: 'upcoming' | 'past' = 'upcoming';
  reviewedMovieIds = new Set<number>();

  constructor(
    private authService: AuthService,
    private movieService: MovieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTickets();
    this.loadUserReviews();
  }

  loadTickets() {
    const userId = this.authService.user$.value.id;
    this.movieService.getTicketsByUserId(userId).subscribe((tickets) => {
      this.tickets = tickets;
      this.loadProjectionsAndMovies();
    });
  }

  loadUserReviews() {
    const userId = this.authService.user$.value.id;
    this.movieService.getReviewsByUserId(userId).subscribe((reviews) => {
      this.reviewedMovieIds = new Set(reviews.map((review) => review.movieId));
    });
  }

  redirectToRateMovie(ticket: Ticket): void {
    if (ticket.projection?.movieId) {
      this.router.navigate([`/movie-review/${ticket.projection?.movieId}`]);
    }
  }

  loadProjectionsAndMovies() {
    const currentDate = new Date();
    this.tickets.forEach((ticket) => {
      this.movieService
        .getProjectionById(ticket.projectionId)
        .subscribe((projection) => {
          ticket.projection = projection;
          this.movieService
            .getMovieById(projection.movieId)
            .subscribe((movie) => {
              projection.movie = movie;
              this.loadedTicketsCount++;
              // Check if all tickets are loaded
              if (this.loadedTicketsCount === this.tickets.length) {
                this.upcomingTickets = this.tickets.filter((ticket) => {
                  const ticketDate = ticket.projection?.date
                    ? new Date(ticket.projection.date)
                    : null;
                  return ticketDate && ticketDate >= currentDate;
                });

                this.pastTickets = this.tickets.filter((ticket) => {
                  const ticketDate = ticket.projection?.date
                    ? new Date(ticket.projection.date)
                    : null;
                  return ticketDate && ticketDate < currentDate;
                });
                console.log(this.upcomingTickets);
              }
            });
        });
    });

    // Filter tickets into upcoming and past based on date and time
  }
}
