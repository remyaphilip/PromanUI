import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Nav } from '../sidenav/nav';
import { Project } from '../interface/project';
import { Board } from '../interface/board';
import { LoginService } from '../login.service';
import { List } from '../interface/list';
import { Issue } from '../interface/issue';



@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})

export class ProjectComponent {

  project: Project;
  temp: any;
  temp1: any;
  temp2: any;
  lists: List[] = [];
  issue: Issue[] = [];
  issueColumn: string[] = [];
  board = <Board>{};
  menuItem = 0;



  constructor(private route: ActivatedRoute, private _loginService: LoginService) {

  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getParams();

  }


  getParams() {
    this.temp = this.route.params
      .subscribe(response => {
        this.project = response as Project;
        this.getBoard(this.project.projectId);
        
      });

  }

  getBoard(projectId: number) {
    this.temp1 = this._loginService.getBoard(projectId).subscribe(data => {
      this.board = data as Board;
      this.getList(this.board.boardId);
    })

  }

  getList(boardId: number) {
    this.temp = this._loginService.getList(boardId).subscribe(response => {
      this.lists = <List[]>response;
    })

  }

  getIssue() {
    this.menuItem = 1;
    this.temp2 = this._loginService.getIssue(this.project.projectId).subscribe(response => {
      this.issue = <Issue[]>response;
      console.log(this.project.projectId, 'test', this.issue);
    })
    this.issueColumn = this.getIssueColumn();

  }

  getIssueColumn(): string[] {
    return ["issueId",
      "title",
      "creationDate",
      "description",
      "type",
      "category",
      "dueDate",
      "reportedById",
      "assignToId",
      "estimate",
      "timespent",
      "statusCode",
      "severityCode",
      "priorityCode",
      "projectId"]
  }

}
