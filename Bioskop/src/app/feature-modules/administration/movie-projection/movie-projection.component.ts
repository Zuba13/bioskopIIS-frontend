import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../movie.service';
import { Projection } from '../model/projection.model';
import { Hall } from '../model/hall.model';
import { Movie } from '../model/movie.model';
import { Ticket } from '../model/ticket.model';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { NotificationService } from '../notification.service';

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
  isModalOpen: boolean = false;
  reservedSeats: boolean[][];

  // Set the maximum height for hall-layout based on screen height

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.selectedSeats = [];
    this.reservedSeats = [];
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
        this.movieService.getTicketsByProjectionId(this.projectionId).subscribe(
          (tickets) => {
            // For each ticket, mark the corresponding seat as occupied
            tickets.forEach((ticket) => {
              const { rowNum, seatNum } = ticket;
              this.reservedSeats[rowNum][seatNum] = true;
            });
          },
          (error) => {
            console.error('Failed to fetch tickets:', error);
            // Handle error appropriately
          }
        );
      });
  }

  buyTickets(): void {
    // Show the modal
    this.isModalOpen = true;
  }

  // Method to handle the modal's confirmation event
  onConfirmation(confirm: boolean): void {
    if (confirm) {
      // User confirmed the purchase
      // Proceed with the purchase logic
      console.log('Tickets purchased!');
    } else {
      // User cancelled the purchase
      console.log('Purchase cancelled.');
    }
    // Close the modal
    this.isModalOpen = false;
  }

  initializeSeatArrays(): void {
    if (this.hall) {
      this.hallNumberOfRowsArray = Array(this.hall.numberOfRows).fill(0);
      this.hallSeatsPerRowArray = Array(this.hall.seatsPerRow).fill(0);
      this.selectedSeats = Array.from({ length: this.hall.numberOfRows }, () =>
        Array(this.hall.seatsPerRow).fill(false)
      );
      this.reservedSeats = Array.from({ length: this.hall.numberOfRows }, () =>
        Array(this.hall.seatsPerRow).fill(false)
      );
    }
  }

  toggleSeatSelection(row: number, seat: number): void {
    if (!this.reservedSeats[row][seat]) {
      this.selectedSeats[row][seat] = !this.selectedSeats[row][seat];
    }
  }

  isSeatSelected(row: number, seat: number): boolean {
    return this.selectedSeats[row][seat];
  }

  isSeatReserved(row: number, seat: number): boolean {
    return this.reservedSeats[row][seat];
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

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  confirmPurchase(): void {
    const selectedSeats: { row: number; seat: number }[] = [];

    // Collect selected seat information
    for (let row = 0; row < this.selectedSeats.length; row++) {
      for (let seat = 0; seat < this.selectedSeats[row].length; seat++) {
        if (this.selectedSeats[row][seat]) {
          selectedSeats.push({ row, seat });
        }
      }
    }

    // Create a ticket for each selected seat
    selectedSeats.forEach((selectedSeat) => {
      const ticket: Ticket = {
        userId: this.authService.user$.value.id,
        projectionId: this.projection.id,
        rowNum: selectedSeat.row,
        seatNum: selectedSeat.seat,
      };

      this.movieService.createTicket(ticket).subscribe(
        (createdTicket) => {
          console.log('Ticket created successfully:', createdTicket);
          console.log('Purchase confirmed!');
          this.closeModal(); // Close the modal after confirmation

          // Show success notification
          this.notificationService.openSuccessSnackBar(
            'Ticket purchased successfully!'
          );
        },
        (error) => {
          console.error('Failed to create ticket:', error);
          // Handle error appropriately, such as displaying an error message

          // Show error notification
          this.notificationService.openErrorSnackBar(
            'Failed to purchase ticket. Please try again later.'
          );
        }
      );
    });

    this.router.navigate(['/home']);
  }
}
