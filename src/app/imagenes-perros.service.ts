import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImagenesPerrosService {
  private apiUrl = 'https://dog.ceo/api/breeds/image/random/8';

  constructor(private http: HttpClient) {}

  getRandomDogs(count: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?count=${count}`).pipe(
      catchError(error => {
        console.error('Error fetching dog images:', error);
        return of({ message: [] });
      })
    );
  }
}
