import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../interface/project';
import { User } from '../interface/user';
import { ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from '../login.service';
import { Issue } from '../interface/issue';


@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss']
})
export class IssueComponent implements OnInit {
  selectedProjectId: number;
  userId: number;
  project: Project[] = [];
  temp; temp1;temp2: any;
  issue: Issue[] = [];
  issueColumn: string[] = [];
  insertIssue: Issue;
  issueForm: boolean = false;
  form: FormGroup;
  projectList: Project[];
  userList: User[];

  constructor(private route: ActivatedRoute, private _loginService: LoginService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.userId = params["userId"];
      }
    );
    this.form = new FormGroup({
      projectId: new FormControl(''),
      issueStatus: new FormControl(''),
      priorityCode: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      dueDate: new FormControl(''),
      assignToId: new FormControl(''),
      summary: new FormControl(''),
      description: new FormControl('')
    });
    this.getProject(this._loginService.userId);
    this.getAllIssuePerUser(this._loginService.userId);
  }

  getAllIssuePerUser(userId: number) {
    this.temp = this._loginService.getAllIssuePerUser(userId).subscribe(response => {
      this.issue = response as Issue[];
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


  addIssue() {

    this.insertIssue = this.form.value;
    this.insertIssue.reportedById = this._loginService.userId;
    console.log(this.insertIssue);
    this.temp2 = this._loginService.AddIssue(this.selectedProjectId, this.insertIssue).subscribe(response => {
      this.insertIssue = response as Issue
    })
  }

  getProject(userId: number) {
    this._loginService.getProjectPerUser(userId)
      .subscribe(response => {
        this.projectList = <Project[]>response;
      });

  }

  getAllUserPerProject() {
    console.log('test',this.selectedProjectId);
    this.temp1 = this._loginService.getAllUserPerProject(this.selectedProjectId).subscribe(response => {
      this.userList = response as User[];
    })
  }
  onChange(selectedProjectId: number){
    this.selectedProjectId = selectedProjectId;
    this.getAllUserPerProject();
  }

}