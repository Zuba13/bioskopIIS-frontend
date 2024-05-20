import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/env/environment';
import { Movie } from '../administration/model/movie.model';
import { Actor } from '../administration/model/actor.model';
import { Director } from '../administration/model/director.model';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  private apiUrl = environment.apiHost;

  constructor(private http: HttpClient) { }

  getFilteredMovies(title: string, year: number, onlyActive: boolean, withContract: boolean): Observable<Movie[]> {
    let params = new HttpParams();
  
    if (title) {
      params = params.append('title', title);
    }
    if (year) {
      params = params.append('year', year.toString());
    }
    if (onlyActive) {
      params = params.append('onlyActive', onlyActive.toString());
    }
    if (withContract) {
      params = params.append('withContract', withContract.toString());
    }
  
    return this.http.get<Movie[]>(this.apiUrl + 'catalog/movie', { params });
  }

  getMovieWithAssociations(id: number): Observable<Movie> {    
    return this.http.get<Movie>(this.apiUrl + 'catalog/movie/' + id);
  }

  getActors(): Observable<Actor[]> {    
    return this.http.get<Actor[]>(this.apiUrl + 'catalog/actor');
  }

  getDirectors(): Observable<Director[]> {    
    return this.http.get<Director[]>(this.apiUrl + 'catalog/director');
  }

  addMovie(movie: Movie): Observable<Movie> {    
    return this.http.post<Movie>(this.apiUrl + 'movies', movie);
  }

  editMovie(movie: Movie): Observable<Movie> {    
    return this.http.put<Movie>(this.apiUrl + 'movies/' + movie.id, movie);
  }
}
