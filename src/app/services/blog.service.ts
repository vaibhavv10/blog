import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Blog } from '../blog/blog';

const apiUrl = 'http://localhost:3000/api/blog/';
@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }

  getBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(apiUrl)
      .pipe(
        tap(_ => this.log('fetched Blogs')),
        catchError(this.handleError('getBlogs', []))
      );
  }

  getBlog(id: any): Observable<Blog> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Blog>(url).pipe(
      tap(_ => console.log(`fetched blog by id=${id}`)),
      catchError(this.handleError<Blog>(`getBlog id=${id}`))
    );
  }

  addBlog(blog: Blog): Observable<Blog> {
    return this.http.post<Blog>(apiUrl, blog).pipe(
      tap((prod: Blog) => console.log(`added blog w/ id=${blog.id}`)),
      catchError(this.handleError<Blog>('addBlog'))
    );
  }

  updateBlog(id: any, blog: Blog): Observable<any> {
    const url = `${apiUrl}/${id}`;
    console.log(`update blog by id=${id}`);
    return this.http.put(url, blog).pipe(
      tap(_ => console.log(`updated blog id=${id}`)),
      catchError(this.handleError<any>('updateBlog'))
    );
  }

  deleteBlog(id: any): Observable<Blog> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Blog>(url).pipe(
      tap(_ => console.log(`deleted blog id=${id}`)),
      catchError(this.handleError<Blog>('deleteBlog'))
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
