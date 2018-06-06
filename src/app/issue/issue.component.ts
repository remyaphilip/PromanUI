import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Pipe, ElementRef, ViewChild } from '@angular/core';
import { OrderPipe } from 'ngx-order-pipe';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import { Project } from '../interface/project';
import { User } from '../interface/user';
import { ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from '../login.service';
import { Issue } from '../interface/issue';
import { Issuecsv } from '../interface/issuecsv';


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
  issueFlag: string;
  issueCsv: Issuecsv[] = [];
  exportAll: boolean;
  exportList: number[] = [];
  index: number;
  order: string = 'issue.issueId';
  reverse: boolean = false;
  sortedCollection: Issue[];
  checkAll: boolean = false;
  selectedFile: File;
  multiple: boolean = false;
  @ViewChild('fileInput') inputEl: ElementRef;

  options = {
    headers: ["IssueId", "Summary", "CreationDate", "Description", "DueDate", "ReportedBy", "AssignedTo", "StatusCode",
      "Severity", "Priority", "StartDate", "EndDate", "ProjectId"]
  };


  constructor(private route: ActivatedRoute, private _loginService: LoginService, private cdr: ChangeDetectorRef,
    private orderPipe: OrderPipe) {
    //this.issue = json_encode(this.issue,JSON_NUMERIC_CHECK);
    this.sortedCollection = orderPipe.transform(this.issue, this.order);
  }

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
      this.cdr.markForCheck();
    })
  }

  addIssue() {
    if (this.issueFlag == "Edit") {
      this.insertIssue = this.form.value as Issue;
      this.insertIssue.reportedById = this._loginService.userId;
      this.insertIssue.issueId = this.tempIssue.issueId;
      this.insertIssue.projectId = this.tempIssue.projectId;
      this._loginService.EditIssue(this.insertIssue.issueId, this.insertIssue.projectId, this.insertIssue)
        .subscribe(response => {
          this.insertIssue = response as Issue
          this.getAllIssuePerUser();
          this.cdr.markForCheck();
        });
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
    this.temp3 = this._loginService.RemoveIssue(this.tempIssue.issueId)
      .subscribe(response => {
        this.getAllIssuePerUser();
        this.cdr.markForCheck();
      });
  }

  getProject(userId: number) {
    this._loginService.getProjectPerOrg(this._loginService.organisation)
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

  generateCsv() {
    this.getAllIssuePerUser();
    this.cdr.markForCheck();
    let icsv: Issuecsv = {} as Issuecsv;
    this.issueCsv = [];
    if (this.exportAll) {
      this.issue.forEach(x => {
        this.issueCsv.push(
          {
            "issueId": x.issueId,
            "summary": x.summary,
            "creationDate": x.creationDate,
            "description": x.description,
            "dueDate": x.dueDate,
            "reportedById": x.reportedById,
            "assignToId": x.assignToId,
            "statusCode": x.statusCode,
            "severityCode": x.severityCode,
            "priorityCode": x.priorityCode,
            "startDate": x.startDate,
            //icsv.startDate.toJSON;
            "endDate": x.endDate,
            "projectId": x.projectId
          });
      });
      new Angular5Csv(this.issueCsv, 'IssueReport', this.options);
    }
    else if (this.exportList.length > 0) {
      console.log('here');
      this.issue.forEach(x => {
        if (x.issueId in this.exportList) {
          console.log('here2');
          this.issueCsv.push(
            {
              "issueId": x.issueId,
              "summary": x.summary,
              "creationDate": x.creationDate,
              "description": x.description,
              "dueDate": x.dueDate,
              "reportedById": x.reportedById,
              "assignToId": x.assignToId,
              "statusCode": x.statusCode,
              "severityCode": x.severityCode,
              "priorityCode": x.priorityCode,
              "startDate": x.startDate,
              //icsv.startDate.toJSON;
              "endDate": x.endDate,
              "projectId": x.projectId
            });
        }
      });

    }

  }
  checkboxEvent(event, issueId: number) {
    if (issueId == 1.1 || this.checkAll) {
      if (this.checkAll) {
        this.exportAll = false;
        this.checkAll = false;
        this.exportList = [];
      } else {
        this.exportAll = true;
        this.checkAll = true;
      }
    } else if (event.target.checked) {
      this.exportList.push(issueId);
      console.log(issueId);
    }
    else if (!event.target.checked) {
      if (this.checkAll) {
        this.checkAll = false;
      }
      this.index = this.exportList.indexOf(issueId);
      if (this.index >= 0) { this.exportList.splice(this.index, 1); }
    }
  }
  setOrder(value: string) {
    if (this.order === value) {
      // this.sortedCollection = this.orderPipe.transform(this.issue,'issue.issueId');
      // console.log(this.sortedCollection);
      // this.cdr.markForCheck;
      this.reverse = !this.reverse;
    }
    this.order = value;
  }

  upLoad(files: FileList) {

    //let formdata: FormData = new FormData();
    //for (let i = 0; i < files.length; i++)
    //formdata.append('fileList',files.item(i));
    console.log("here")
    this._loginService.UpLoadFile(files);
   // console.log(formdata.getAll('fileList'));
    // for (let i = 0; i < files.length; i++)
    //   console.log(files.item(i));
    //  this.issueService.uploadFiles(
    //    {
    //      files: files
    //    }
    // )
  }

}
