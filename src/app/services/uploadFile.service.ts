// file-upload.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
    yourGoogleCloudApiKey: string = '416245973778814'

  constructor(private http: HttpClient) {}

//   uploadFile(file: File): Observable<string> {
//     const formData = new FormData();
//     formData.append('file', file);
//     const headers = new HttpHeaders({
//       'Authorization': `Bearer ${this.yourGoogleCloudApiKey}`,
//       'Content-Type': 'multipart/form-data'
//     });
//     const uploadUrl = 'https://storage.googleapis.com/upload/storage/v1/b/o'; 
  
//     return this.http.post(uploadUrl, formData, { headers })
//       .pipe(
//         map(response => response['selfLink'] as string)
//       );
//   }
uploadFile(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.yourGoogleCloudApiKey}`,
    });

    const uploadUrl = `https://storage.googleapis.com/upload/storage/v1/b/post-feature-img/o`;

    return this.http.post(uploadUrl, formData, { headers })
      .pipe(
        map(response => response['selfLink'] as string)
      );
  }
}
