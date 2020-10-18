import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import {  throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Location } from '../models/location';
import { City } from '../models/city';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private apiServer = 'http://localhost:3000';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private httpClient: HttpClient) { }

  createLocation(location): Observable<Location> {
    return this.httpClient.post<Location>(this.apiServer + '/locations/', JSON.stringify(location), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }
  getLocationById(id): Observable<Location> {
    return this.httpClient.get<Location>(this.apiServer + '/locations/' + id)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  getLocations(): Observable<Location[]> {
    return this.httpClient.get<Location[]>(this.apiServer + '/locations/')
    .pipe(
      catchError(this.errorHandler)
    );
  }

  getCities(): Observable<City[]> {
    return this.httpClient.get<City[]>(this.apiServer + '/cities/')
    .pipe(
      catchError(this.errorHandler)
    );
  }

  updateLocation(id, location): Observable<Location> {
    return this.httpClient.put<Location>(this.apiServer + '/locations/' + id, JSON.stringify(location), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  deleteLocation(id) {
    return this.httpClient.delete<Location>(this.apiServer + '/locations/' + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }
  errorHandler(error) {
     let errorMessage = '';
     if (error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     console.log(errorMessage);
     return throwError(errorMessage);
  }
}
