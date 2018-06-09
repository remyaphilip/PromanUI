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
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class LoginService {
  private base = environment._baseUrl;
  userId: number;
  organisation: string;
  projectId: number;
  projectName: string;
  login: boolean;
  userList: User[];



  private project: Project[];
  constructor(private http: HttpClient) { }

  getLogin(email: string, passwordHash: string): Observable<User> {
    return this.http.get<User>(this.base + '/user/' + email + '/' + passwordHash);
  }

  getProjectPerOrg(organisation: string): Observable<Project[]> {
    return this.http.get<Project[]>(this.base + '/project/' + organisation);
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
  getlist(projectId: number) {
    return this.http.get<List[]>(this.base + '/projectId/' + projectId);
  }

  getIssue(projectId: number) {
    return this.http.get<Issue[]>(this.base + '/project/' + projectId + '/issues');
  }

  getAllIssuePerUser(userId: number) {
    return this.http.get<Issue[]>(this.base + '/issue/' + userId);
  }

  AddCard(listId: number, card: Card): Observable<Card> {
    return this.http.post<Card>(this.base + '/card/' + listId, card, httpOptions);
  }

  getAllCardPerList(listId: number): Observable<Card[]> {
    return this.http.get<Card[]>(this.base + '/getallcard/' + listId);
  }

  AddIssue(projectId: number, issue: Issue): Observable<Issue> {
    return this.http.post<Issue>(this.base + '/issue/' + projectId, issue, httpOptions);
  }

  EditIssue(issueId: number, projectId: number, issue: Issue): Observable<Issue> {
    return this.http.post<Issue>(this.base + '/editissue/' + issueId + '/' + projectId, issue, httpOptions);
  }

  RemoveIssue(issueId: number): Observable<boolean> {
    console.log(issueId);
    return this.http.delete<boolean>(this.base + '/delete/' + issueId, httpOptions);
  }
  GetAllUsers(organisation: string) {
    return this.http.get<User[]>(this.base + '/usersperorg/' + organisation);
  }

  UpLoadFile(files: FileList): Observable<boolean> {

    return this.http.post<boolean>(this.base + '/upload', files);
  }
  AddProject(project: Project) {
    return this.http.post<boolean>(this.base + '/newproject', project, httpOptions);
  }

  AddUser(user: User) {
    return this.http.post<boolean>(this.base + '/newuser/', user, httpOptions);
  }
  EditUser(userId: number, user: User) {
    return this.http.post<boolean>(this.base + '/edituser/' + userId, user, httpOptions);
  }
  RemoveUser(userId: number) {
    return this.http.delete<boolean>(this.base + '/removeuser/' +userId, httpOptions)
  }
}
