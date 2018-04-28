import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { ActivatedRoute } from '@angular/router';

import { Project } from '../interface/project';
import { Board } from '../interface/board';
import { List } from '../interface/list';
import { Issue } from '../interface/issue';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent implements OnInit {

  project: Project;
  temp: any;
  temp1: any;
  temp2: any;
  lists: List[] = [];
  issue: Issue[] = [];
  issueColumn: string[] = [];
  board = <Board>{};
  menuItem = 0;


  constructor(private _loginService: LoginService, private route: ActivatedRoute) { }

  ngOnInit() {
    
  }
  // getParams() {
  //   this.temp = this.route.paramMap
  //     .subscribe(response => {
  //       this.projectId = response  ;
  //       this.getBoard(this.project.projectId);

  //     });

  // }

  
  getIssue() {
    this.menuItem = 1;
    this.temp2 = this._loginService.getIssue(this._loginService.projectId).subscribe(response => {
      this.issue = <Issue[]>response;
      // console.log(this.project.projectId, 'test', this.issue);
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