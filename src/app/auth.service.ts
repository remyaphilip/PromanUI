import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable()
export class AuthService {

  constructor() { }

  loggedIn() {
    return localStorage.getItem('loggedIn') == 'true'
  }


}
