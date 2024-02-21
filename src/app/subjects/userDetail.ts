import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserSubject {
    private userSubject = new BehaviorSubject<Object>(null);

    storeUserDetails(userDetails: Object): void {
        this.userSubject.next(userDetails);
      }

      getUserDetails(): Observable<any> {
        return this.userSubject.asObservable();
      }
}