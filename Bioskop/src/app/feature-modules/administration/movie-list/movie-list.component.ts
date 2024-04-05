import { Component, OnInit } from '@angular/core';
import { Movie } from '../model/movie.model';
import { MovieService } from '../movie.service';

@Component({
  selector: 'xp-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent implements OnInit {
  movies: Movie[];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.movieService.getMovies().subscribe((movies) => (this.movies = movies));
  }

  shortenNum(num: number): string {
    if (num >= 1000) {
      return (num / 10000).toFixed(0) + 'k';
    }
    return num.toString();
  }
}
