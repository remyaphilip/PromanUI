import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthguardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) { }
  canActivate(): boolean {
    if (!this.auth.loggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
