import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../catalog.service';
import { Movie } from '../../administration/model/movie.model';
import { Router } from '@angular/router';

@Component({
  selector: 'xp-movie-catalog',
  templateUrl: './movie-catalog.component.html',
  styleUrls: ['./movie-catalog.component.css']
})
export class MovieCatalogComponent implements OnInit {

  movies: Movie[];
  title: string = "";
  year: number;
  onlyActive: boolean = false;
  withContract: boolean = false;

  constructor(
    private catalogService: CatalogService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.catalogService.getFilteredMovies(this.title, this.year, this.onlyActive, this.withContract).subscribe(
      (data: Movie[]) => {
        this.movies = data;
      }
    )
  }

  routeMovieDetails(movieId: number): void {
    this.router.navigate(['/movie-catalog', movieId]);
  }

}
