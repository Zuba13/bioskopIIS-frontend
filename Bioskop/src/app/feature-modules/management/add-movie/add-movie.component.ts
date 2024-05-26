import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogService } from '../catalog.service';
import { Movie } from '../../administration/model/movie.model';
import { Actor } from '../../administration/model/actor.model';
import { Director } from '../../administration/model/director.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../../administration/notification.service';

@Component({
  selector: 'xp-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit{

  movie: Movie;
  actors: Actor[];
  directors: Director[];
  selectedActors: Actor[] = [];
  selectedDirectors: Director[] = [];
  addMovieForm: FormGroup;

  constructor(
    private catalogService: CatalogService,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getActors();
    this.getDirectors();
    this.addMovieForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'year': new FormControl(null, [Validators.required, Validators.min(1888)]),
      'genre': new FormControl(null, Validators.required),
      'duration': new FormControl(null, [Validators.required, Validators.min(1)]),
      'language': new FormControl(null, Validators.required),
      'defaultPrice': new FormControl(null, [Validators.required, Validators.min(1)]),
      'image': new FormControl(null, Validators.required),
    });
  }

  addMovie(): void {
    if (this.addMovieForm.valid) {
      const newMovie: Movie = {
        id: 0,
        title: this.addMovieForm.value.title,
        year: this.addMovieForm.value.year,
        genre: this.addMovieForm.value.genre,
        duration: this.addMovieForm.value.duration,
        language: this.addMovieForm.value.language,
        defaultPrice: this.addMovieForm.value.defaultPrice,
        image: this.addMovieForm.value.image,
        actors: this.selectedActors,
        directors: this.selectedDirectors
      };

      this.catalogService.addMovie(newMovie).subscribe(
        (data: Movie) => {
          this.movie = data;
          this.notificationService.openSuccessSnackBar('Movie successfully added!');
          this.router.navigate(['/movie-catalog']);
          //this.router.navigate(['/movie-catalog', this.movie.id]);
        }
      )
    } else {
      this.notificationService.openErrorSnackBar('Please fill in all the required fields!');
    }
  }

  getActors(): void {
    this.catalogService.getActors().subscribe(
      (data: Actor[]) => {
        this.actors = data;
      }
    )
  }

  getDirectors(): void {
    this.catalogService.getDirectors().subscribe(
      (data: Director[]) => {
        this.directors = data;
      }
    )
  }
}
