import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { User } from './interface/user';
import { Project } from './interface/project';
import { List } from './interface/list';
import { Board } from './interface/board'
import { Issue } from './interface/issue';
import { Card } from './interface/card';
import { Observable } from 'rxjs/Observable';
import { environment } from '../environments/environment';
import { Credentials } from './interface/credentials';

import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    
    // 'Content-Type': 'application/json',
    // "Access-Control-Allow-Origin": "*"

  })
};

@Injectable()
export class LoginService {
  private base = environment._baseUrl;
  //userId: number = localStorage.getItem('userId');
  userId: number;
  organisation: string = "test";
  projectId: number;
  projectName: string;
  login: boolean;
  userList: User[];



  private project: Project[];
  constructor(private http: HttpClient) { }


  // getLogin(email: string, passwordHash: string): Observable < User > {
  //   return this.http.get<User>(this.base + '/user/' + email + '/' + passwordHash);
  // }

  getLogin(user:User)  {
    let formData: FormData = new FormData(); 
    formData.append('username', user.email);
    formData.append('password', user.passwordHash);
    return this.http.post(this.base + '/login',formData,{withCredentials:true})
    .pipe(
      map(response=>{
        console.log(response);
        localStorage.setItem('loggedIn',"true");
          return response;
      }));
  }

  logOut(){
    console.log("test");
    return this.http.delete(this.base+'/logout',{withCredentials:true}).pipe(
      map(response=>{
        localStorage.setItem('loggedIn', "false");
        return response;
      })
    );
  }

  getProjectPerOrg(organisation: string): Observable<Project[]> {
    return this.http.get<Project[]>(this.base + '/project/' + "test",{withCredentials:true} );
  }

  getAllUserPerProject(projectId: number): Observable<User[]> {
    return this.http.get<User[]>(this.base + '/projectuser/' + projectId);
  }

  getBoard(projectId: number): Observable<Board> {
    return this.http.get<Board>(this.base + '/board/' + projectId,{withCredentials:true});
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
    return this.http.get<Issue[]>(this.base + '/issue/' + localStorage.getItem("userId"));
  }

  AddCard(listId: number, card: Card): Observable<boolean> {
    return this.http.post<boolean>(this.base + '/card/' + listId, card, httpOptions);
  }

  EditCard(card: Card): Observable<boolean> {
    return this.http.post<boolean>(this.base + '/editcard/' + card.listId + '/' + card.cardId, card, httpOptions)
  }

  RemoveCard(cardId: number): Observable<boolean> {
    return this.http.delete<boolean>(this.base + '/removecard/' + cardId, httpOptions);
  }

  getAllCardPerList(listId: number): Observable<Card[]> {
    return this.http.get<Card[]>(this.base + '/getallcard/' + listId);
  }

  AddIssue(projectId: number, issue: Issue): Observable<boolean> {
    return this.http.post<boolean>(this.base + '/issue/' + projectId, issue);
  }

  EditIssue(issueId: number, projectId: number, issue: Issue): Observable<boolean> {
    return this.http.post<boolean>(this.base + '/editissue/' + issueId + '/' + projectId, issue, httpOptions);
  }

  RemoveIssue(issueId: number): Observable<boolean> {
    return this.http.delete<boolean>(this.base + '/delete/' + issueId, httpOptions);
  }
  GetAllUsers() {
    return this.http.get<User[]>(this.base + '/peers',{withCredentials:true});
  }

  UpLoadFile(files: FileList): Observable<boolean> {
    return this.http.post<boolean>(this.base + '/upload', files);
  }

  AddProject(project: Project): Observable<boolean> {
    return this.http.post<boolean>(this.base + '/newproject', project, httpOptions);
  }

  EditProject(project: Project): Observable<boolean> {
    return this.http.post<boolean>(this.base + '/editproject/' + project.projectId, httpOptions);
  }

  RemoveProject(projectId: number): Observable<boolean> {
    return this.http.delete<boolean>(this.base + '/removeproject/' + projectId, httpOptions);
  }

  AddUser(user: User) {
    return this.http.post<boolean>(this.base + '/newuser/', user, httpOptions);
  }
  EditUser(userId: number, user: User) {
    return this.http.post<boolean>(this.base + '/edituser/' + localStorage.getItem("userId"), user, httpOptions);
  }
  RemoveUser(userId: number) {
    return this.http.delete<boolean>(this.base + '/removeuser/' + localStorage.getItem("userId"), httpOptions)
  }
}
