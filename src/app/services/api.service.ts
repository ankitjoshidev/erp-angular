import { Injectable } from
 
'@angular/core';
import { HttpClient } from
 
'@angular/common/http';
import { Observable } from
 
'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export
 
class CommonApiService {
  // private apiUrl = 'https://post-backend-q2it.onrender.com'; // Replace with your actual API base URL
  // private apiUrl = 'http://localhost:3000'; // Replace with your actual API base URL/
  private apiUrl = environment.api; // Replace with your actual API base URL

  constructor(private http: HttpClient) {}

  add(data: any, path: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${path}`, data);
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
}