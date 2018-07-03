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
  projectName: string;
  boardFlag: boolean = true;


  constructor(private loginService: LoginService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.projectName = this.loginService.projectName;
    this.getParams();
  }
  getParams() {
    this.temp = this.route.paramMap
      .subscribe(response => {
        this.temp1 = response;
        this.boardFlag = this.temp1;
      });

  }


  // getIssue() {
  //   this.menuItem = 1;
  //   this.temp2 = this.loginService.getIssue(this.loginService.projectId).subscribe(response => {
  //     this.issue = <Issue[]>response;
  //   })
  //   this.issueColumn = this.getIssueColumn();

  // }



  // getIssueColumn(): string[] {
  //   return ["issueId",
  //     "title",
  //     "creationDate",
  //     "description",
  //     "type",
  //     "category",
  //     "dueDate",
  //     "reportedById",
  //     "assignToId",
  //     "estimate",
  //     "timespent",
  //     "statusCode",
  //     "severityCode",
  //     "priorityCode",
  //     "projectId"]
  // }
}
