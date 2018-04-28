import { Component, OnInit, Input } from '@angular/core';
import { Issue } from '../interface/issue';
import { Project } from '../interface/project';
import { LoginService } from '../login.service';


@Component({
  selector: 'app-projectissue',
  templateUrl: './projectissue.component.html',
  styleUrls: ['./projectissue.component.scss']
})
export class ProjectissueComponent implements OnInit {

 // @Input() issueColumn: string[];
  //@Input() issue: Issue[];

  project: Project;
  temp: any;
  temp1: any;
  temp2: any;
  issue: Issue[] = [];
  issueColumn: string[] = [];
  constructor(private _loginService: LoginService) { }

  ngOnInit() {
    this.getIssue();
  }
 
  getIssue() {
    this.temp2 = this._loginService.getIssue(this._loginService.projectId).subscribe(response => {
      this.issue = <Issue[]>response;
      console.log(this.project.projectId, 'test', this.issue);
    })
    this.issueColumn = this.getIssueColumn();

  }



  getIssueColumn(): string[] {
    return ["issueId",
      "title",
     // "creationDate",
     // "description",
      // "type",
      // "category",
      // "dueDate",
      // "reportedById",
      // "assignToId",
      // "estimate",
      // "timespent",
      "statusCode",
    //  "severityCode",
      "priorityCode"]
    //  "projectId"]
  }
}
