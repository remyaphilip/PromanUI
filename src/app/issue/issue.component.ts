import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../interface/project';
import { ActivatedRoute, Params } from '@angular/router';
import { LoginService } from '../login.service';
import { Issue } from '../interface/issue';


@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss']
})
export class IssueComponent implements OnInit {
  userId: number;
  project: Project[] = [];
  temp: any;
  issue: Issue[] = [];
  issueColumn: string[] =[];

  constructor(private route: ActivatedRoute, private _loginService: LoginService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.userId = params["userId"];
        console.log('userid', this.userId);
      }
    );

    this.getAllIssuePerUser(2);
  }

  getAllIssuePerUser(userId: number) {
    this.temp = this._loginService.getAllIssuePerUser(userId).subscribe(response => {
      this.issue = response as Issue[];
      console.log(this.issue);
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