import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export
 
class CommonApiService {
  // private apiUrl = 'https://post-backend-q2it.onrender.com'; 
  private apiUrl = 'http://localhost:3000'; 
  // private apiUrl = environment.api; 

  constructor(private http: HttpClient) {}

  add(data: any, path: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${path}`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  update(id: number, data: any, path: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${path}/${id}`, data);
  }

  get(path: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${path}`);
  }

  delete(id: number, path: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${path}/${id}`);
  }
  private handleError(error: HttpErrorResponse): Observable<never> {
    debugger
    return throwError(error.error.message);
  }
}