import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostSubject {
    private postSubject = new BehaviorSubject<Object>(null);

    storePostDetails(userDetails: Object): void {
        this.postSubject.next(userDetails);
      }

      getPostDetails(): Observable<any> {
        return this.postSubject.asObservable();
      }
}