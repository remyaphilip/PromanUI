import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './interface/user';
import { Project } from './interface/project';
import { Board } from './interface/board'
import { Observable } from 'rxjs/Observable';
import { environment } from '../environments/environment';


@Injectable()
export class LoginService {
  private base = environment._baseUrl;

  private project: Project[];
  constructor(private http: HttpClient) { }

  getLogin(email: string, passwordHash: string): Observable<User> {
    return this.http.get<User>(this.base + '/user/' + email + '/' + passwordHash);
  }

  getProjectPerUser(userId: number): Observable<Project[]> {
    return this.http.get<Project[]>(this.base + '/userproject/' + userId);
  }

  getBoard(projectId: number): Observable<Board> {
    return this.http.get<Board>(this.base + '/board/' + projectId);
  }


}
