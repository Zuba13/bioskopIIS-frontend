import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from './model/movie.model';
import { environment } from 'src/env/environment';
import { Observable } from 'rxjs';
import { Projection } from './model/projection.model';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiUrl = environment.apiHost + 'movies';

  constructor(private http: HttpClient) {}

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.apiUrl);
  }

  getMovieById(id: number): Observable<Movie> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Movie>(url);
  }

  deleteMovie(id: number): Observable<Movie> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Movie>(url);
  }

  addMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(this.apiUrl, movie);
  }

  updateMovie(movie: Movie): Observable<Movie> {
    const url = `${this.apiUrl}/${movie.id}`;
    return this.http.put<Movie>(url, movie);
  }

  getProjectionsForMovie(movieId: number): Observable<Projection[]> {
    const url = `${this.apiUrl}/${movieId}/projections`;
    return this.http.get<Projection[]>(url);
  }
}
