import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { User } from './interface/user';
import { environment } from '../environments/environment';


@Injectable()
export class SharedService {
  private base = environment._baseUrl;

  constructor(private http: HttpClient) { }

  getLogin(email: string, passwordHash: string): Observable<User> {
    return this.http.get<User>(this.base + '/user/' + email + '/' + passwordHash);
  }

}
