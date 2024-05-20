import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/env/environment';
import { Projection } from '../administration/model/projection.model';
import { Observable } from 'rxjs';
import { Timeslot } from './model/timeslot.model';
import { Time } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class RepertoireService {
  private apiUrl = environment.apiHost;

  constructor(private http: HttpClient) { }

  getProjections(hallId: number, movieId: number, date: Date): Observable<Projection[]> {
    let params = new HttpParams();
    if (hallId) {
      params = params.append('hallId', hallId.toString());
    }
    if (movieId) {
      params = params.append('movieId', movieId.toString());
    }
    if (date) {
      params = params.append('date', date.toString());
    }

    return this.http.get<Projection[]>(this.apiUrl + 'repertoire', { params });
  }

  getAvailableTimeslots(hallId: number, movieId: number, days: number, startDate: Date): Observable<Timeslot[]> {
    let params = new HttpParams();
    params = params.append('hallId', hallId.toString());
    params = params.append('movieId', movieId.toString());
    params = params.append('days', days.toString());
    params = params.append('startDate', startDate.toISOString().split('T')[0]);

    return this.http.get<Timeslot[]>(this.apiUrl + 'repertoire/timeslot', { params });
  }

  addProjection(hallId: number, movieId: number, days: number, ticketPrice: number, timeslot: Timeslot): Observable<Projection> {
    let params = new HttpParams();
    params = params.append('hallId', hallId.toString());
    params = params.append('movieId', movieId.toString());
    params = params.append('days', days.toString());
    params = params.append('ticketPrice', ticketPrice.toString());

    return this.http.post<Projection>(this.apiUrl + 'repertoire', timeslot, { params });
  }  

  getConsecutiveDays(projectionId: number): Observable<number> {
    return this.http.get<number>(this.apiUrl + 'repertoire/consecutive-days/' + projectionId);
  } 

  deleteProjection(projectionId: number, cancelConsecutive: boolean): Observable<Projection[]> {
    let params = new HttpParams();
    params = params.append('projectionId', projectionId.toString());
    if (cancelConsecutive) {
      params = params.append('cancelConsecutive', cancelConsecutive.toString());
    }
    return this.http.delete<Projection[]>(this.apiUrl + 'repertoire/projection', { params });
  }
}