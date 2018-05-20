import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Project } from '../interface/project';
import { User } from '../interface/user';
import { ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from '../login.service';
import { Issue } from '../interface/issue';


@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IssueComponent implements OnInit {
  selectedProjectId: number;
  userId: number;
  project: Project[] = [];
  temp; temp1; temp2; temp3: any;
  issue: Issue[] = [];
  issueColumn: string[] = [];
  insertIssue; tempIssue: Issue;
  issueForm: boolean = false;
  form: FormGroup;
  projectList: Project[];
  //userList: User[];
  issueFlag: string;
  

  constructor(private route: ActivatedRoute, private _loginService: LoginService,private cdr:ChangeDetectorRef) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.userId = params["userId"];
      }
    );
    this.form = new FormGroup({
      projectName: new FormControl(''),
      statusCode: new FormControl(''),
      priorityCode: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      dueDate: new FormControl(''),
      assignToId: new FormControl(''),
      summary: new FormControl(''),
      description: new FormControl('')
    });
    this.getProject(this._loginService.userId);
    this.getAllIssuePerUser();
  }

  getAllIssuePerUser() {
    this.temp = this._loginService.getAllIssuePerUser(this._loginService.userId).subscribe(response => {
      this.issue = response as Issue[];
      console.log(this.issue);
     this.cdr.markForCheck();
    })
  }

  addIssue() {
    if (this.issueFlag == "Edit") {
      this.insertIssue = this.form.value as Issue;
      this.insertIssue.reportedById = this._loginService.userId;
      this.insertIssue.issueId = this.tempIssue.issueId;
      this.insertIssue.projectId = this.tempIssue.projectId;
      console.log('insertissue',this.insertIssue.statusCode);
      console.log('formvalue',this.form.value);
      this._loginService.EditIssue(this.insertIssue.issueId, this.insertIssue.projectId, this.insertIssue)
      .subscribe(response => {
        this.insertIssue = response as Issue
        this.getAllIssuePerUser();
        this.cdr.markForCheck();
      });
      console.log("in edit mode");
     
    }
    else {
      this.insertIssue = this.form.value;
      this.insertIssue.reportedById = this._loginService.userId;
      this.insertIssue.projectId = this.projectList.find(p => p.name == this.insertIssue.projectName).projectId;
      this.temp2 = this._loginService.AddIssue(this.insertIssue.projectId, this.insertIssue).subscribe(response => {
        this.insertIssue = response as Issue
        this.getAllIssuePerUser();
       this.cdr.markForCheck();
      })
    }
  }

  editIssue(issueId: number) {
    this.issueForm = true;
    this.issueFlag = "Edit";
    this.tempIssue = this.issue.find(iss => iss.issueId == issueId);
    this.form.patchValue({
      projectName: this.projectList.find(p => p.projectId == this.tempIssue.projectId).name,
      statusCode: this.tempIssue.statusCode,
      priorityCode: this.tempIssue.priorityCode,
      startDate: this.tempIssue.startDate,
      endDate: this.tempIssue.endDate,
      dueDate: this.tempIssue.dueDate,
      assignToId: this.tempIssue.assignToId,
      summary: this.tempIssue.summary,
      description: this.tempIssue.description
    });
  }

  removeIssue() {
    console.log(this.issueFlag);
    this.temp3 = this._loginService.RemoveIssue(this.tempIssue.issueId)
      .subscribe(response => {
        console.log(response)
        this.getAllIssuePerUser();
       this.cdr.markForCheck();
      });
  }

  getProject(userId: number) {
    this._loginService.getProjectPerUser(userId)
      .subscribe(response => {
        this.projectList = <Project[]>response;
      });

  }
  setIssueFlagAddIssue() {
    this.issueFlag = "Add";
    this.issueForm = true;
    this.form.reset();
  }
  setIssueForm() {
    this.issueFlag = "";
    this.issueForm = false;
    this.tempIssue = {} as Issue;
  }
  // getAllUserPerProject() {
  //   console.log('test', this.selectedProjectId);
  //   this.temp1 = this._loginService.getAllUserPerProject(this.selectedProjectId).subscribe(response => {
  //     this.userList = response as User[];
  //   })
  // }
  // onChange(selectedProjectId: number) {
  //   this.selectedProjectId = selectedProjectId;
  //   this.getAllUserPerProject();
  // }

}