import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root', 
})
export class AuthService {
  private readonly TOKEN_KEY = 'currentUser';

  constructor() {}

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  decodeToken(): string | null {
    const helper = new JwtHelperService();
    const token = localStorage.getItem(this.TOKEN_KEY);
    return helper.decodeToken(token);
  }
}
