import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../catalog.service';
import { Movie } from '../../administration/model/movie.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'xp-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit{

  movie: Movie;
  movieId: number;

  constructor(
    private catalogService: CatalogService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.movieId = +this.route.snapshot.paramMap.get('id')!;
    this.getMovie();
  }

  getMovie(): void {
    this.catalogService.getMovieWithAssociations(this.movieId).subscribe(
      (data: Movie) => {
        this.movie = data;
      }
    )
  }
}
