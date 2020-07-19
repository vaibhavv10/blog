import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Blog } from '../blog/blog';

const apiUrl = 'http://localhost:3000/api/';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }


  getBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(apiUrl + 'blog')
      .pipe(
        tap(_ => this.log('fetched Blogs')),
        catchError(this.handleError('getBlogs', []))
      );
  }

  getBlog(id: any): Observable<Blog> {
    return this.http.get<Blog>(apiUrl + 'blog/' + id).pipe(
      tap(_ => console.log(`fetched blog by id=${id}`)),
      catchError(this.handleError<Blog>(`getBlog id=${id}`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }
}
