import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './interface/user';
import { Project } from './interface/project';
import { List } from './interface/list';
import { Board } from './interface/board'
import { Issue } from './interface/issue';
import { Card } from './interface/card';
import { Observable } from 'rxjs/Observable';
import { environment } from '../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class LoginService {
  private base = environment._baseUrl;
  userId: number;
  projectId: number;
  login: boolean = true;



  private project: Project[];
  constructor(private http: HttpClient) { }

  getLogin(email: string, passwordHash: string): Observable<User> {
    return this.http.get<User>(this.base + '/user/' + email + '/' + passwordHash);
  }

  getProjectPerUser(userId: number): Observable<Project[]> {
    return this.http.get<Project[]>(this.base + '/userproject/' + userId);
  }

  getAllUserPerProject(projectId: number): Observable<User[]> {
    return this.http.get<User[]>(this.base + '/projectuser/' + projectId);
  }

  getBoard(projectId: number): Observable<Board> {
    return this.http.get<Board>(this.base + '/board/' + projectId);
  }

  getList(boardId: number) {
    return this.http.get<List[]>(this.base + '/board/' + boardId + '/list');
  }

  getIssue(projectId: number) {
    return this.http.get<Issue[]>(this.base + '/project/' + projectId + '/issues');
  }

  getAllIssuePerUser(userId: number) {
    return this.http.get<Issue[]>(this.base + '/issue/' + userId);
  }

  AddCard(listId: number, card: Card): Observable<Card> {
    return this.http.post<Card>(this.base + '/card/' + listId, card, httpOptions)

  }
}
