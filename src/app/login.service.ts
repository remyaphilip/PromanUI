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
    return this.http.get<User[]>(this.base + '/projectuser/' + projectId,{withCredentials:true});
  }
  //   /project/{id}/users

  getBoard(projectId: number): Observable<Board> {
    return this.http.get<Board>(this.base + '/board/' + projectId,{withCredentials:true});
  }

  getList(boardId: number) {
    return this.http.get<List[]>(this.base + '/board/' + boardId + '/list',{withCredentials:true});
  }

  getlist(projectId: number) {
    return this.http.get<List[]>(this.base + '/projectId/' + projectId,{withCredentials:true});
  }

  getIssue(projectId: number) {
    return this.http.get<Issue[]>(this.base + '/project/' + projectId + '/issues',{withCredentials:true});
  }

  getAllIssuePerUser() {
    return this.http.get<Issue[]>(this.base + '/issue/',{withCredentials:true});
  }

  AddCard(listId: number, card: Card): Observable<boolean> {
    return this.http.post<boolean>(this.base + '/card/' + listId, card, {withCredentials:true});
  }

  EditCard(card: Card): Observable<boolean> {
    return this.http.post<boolean>(this.base + '/editcard/' + card.listId + '/' + card.cardId, card, {withCredentials:true})
  }

  RemoveCard(cardId: number): Observable<boolean> {
    return this.http.delete<boolean>(this.base + '/removecard/' + cardId,{withCredentials:true});
  }

  getAllCardPerList(listId: number): Observable<Card[]> {
    return this.http.get<Card[]>(this.base + '/getallcard/' + listId,{withCredentials:true});
  }

  AddIssue(projectId: number, issue: Issue): Observable<boolean> {
    return this.http.post<boolean>(this.base + '/issue/' + projectId, issue,{withCredentials:true});
  }

  EditIssue(issueId: number, projectId: number, issue: Issue): Observable<boolean> {
    return this.http.post<boolean>(this.base + '/editissue/' + issueId + '/' + projectId, issue, {withCredentials:true});
  }

  RemoveIssue(issueId: number): Observable<boolean> {
    return this.http.delete<boolean>(this.base + '/delete/' + issueId, {withCredentials:true});
  }
  GetAllUsers() {
    return this.http.get<User[]>(this.base + '/peers',{withCredentials:true});
  }

  UpLoadFile(files: FileList): Observable<boolean> {
    return this.http.post<boolean>(this.base + '/upload', files,{withCredentials:true});
  }

  AddProject(project: Project): Observable<boolean> {
    return this.http.post<boolean>(this.base + '/newproject', project, {withCredentials:true});
  }

  EditProject(project: Project): Observable<boolean> {
    return this.http.post<boolean>(this.base + '/editproject/' + project.projectId, {withCredentials:true});
  }

  RemoveProject(projectId: number): Observable<boolean> {
    return this.http.delete<boolean>(this.base + '/removeproject/' + projectId, {withCredentials:true});
  }

  AddUser(user: User) {
    return this.http.post<boolean>(this.base + '/newuser/', user, {withCredentials:true});
  }
  EditUser(userId: number, user: User) {
    return this.http.post<boolean>(this.base + '/edituser/' + localStorage.getItem("userId"), user, {withCredentials:true});
  }
  RemoveUser(userId: number) {
    return this.http.delete<boolean>(this.base + '/removeuser/' + localStorage.getItem("userId"), {withCredentials:true})
  }
}
