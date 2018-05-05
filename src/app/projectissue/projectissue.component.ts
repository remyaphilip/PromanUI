import { Component, OnInit, Input } from '@angular/core';
import { Issue } from '../interface/issue';
import { Project } from '../interface/project';
import { LoginService } from '../login.service';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from '../interface/user';



@Component({
  selector: 'app-projectissue',
  templateUrl: './projectissue.component.html',
  styleUrls: ['./projectissue.component.scss']
})
export class ProjectissueComponent implements OnInit {

  project: Project;
  temp; temp1; temp2: any;
  issue: Issue[] = [];
  insertIssue: Issue;
  issueColumn: string[] = [];
  issueForm: boolean = false;
  form: FormGroup;
  userList: User[] = [];
  constructor(private _loginService: LoginService) { }

  ngOnInit() {
    this.form = new FormGroup({
      issueStatus: new FormControl(''),
      priorityCode: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      dueDate: new FormControl(''),
      assignToId: new FormControl(''),
      summary: new FormControl(''),
      description: new FormControl('')
    });
    this.getAllUserPerProject();
    this.getIssue();
  }

  getIssue() {
    console.log('p');
    this.temp = this._loginService.getIssue(this._loginService.projectId).subscribe(response => {
      this.issue = <Issue[]>response;
    })
    this.issueColumn = this.getIssueColumn();

  }

  getIssueColumn(): string[] {
    return ["issueId",
      "summary",
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

  getAllUserPerProject() {
    this.temp1 = this._loginService.getAllUserPerProject(this._loginService.projectId).subscribe(response => {
      this.userList = response as User[];
    })
  }
  
  addIssue() {
    this.insertIssue = this.form.value;
    this.insertIssue.reportedById = this._loginService.userId;
    //this.insertIssue.projectId = this._loginService.projectId;
    console.log(this.insertIssue);
    this.temp2 = this._loginService.AddIssue(this._loginService.projectId, this.insertIssue).subscribe(response => {
    this.insertIssue = response as Issue
    })
  }
}
