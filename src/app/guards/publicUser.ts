// auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuardPubliceUser implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.getToken()) {
        this.router.navigate(['']);
        return false;
    } else {
      return true;
    }
  }
}
