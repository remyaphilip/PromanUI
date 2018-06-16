import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Pipe, ElementRef, ViewChild } from '@angular/core';
import { OrderPipe } from 'ngx-order-pipe';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import { Project } from '../interface/project';
import { User } from '../interface/user';
import { ActivatedRoute, Params } from '@angular/router';
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
  userId: number;
  projectList: Project[] = [];
  issueList: Issue[] = [];
  issue: Issue = null;
  issueForm: boolean = false;
  issueCsv: Issuecsv[] = [];
  exportAll: boolean;
  exportList: number[] = [];
  index: number;
  order: string = 'issueList.issueId';
  reverse: boolean = false;
  sortedCollection: Issue[];
  checkAll: boolean = false;

  options = {
    headers: ["IssueId", "Summary", "CreationDate", "Description", "DueDate", "ReportedBy", "AssignedTo", "StatusCode",
      "Severity", "Priority", "StartDate", "EndDate", "ProjectId"]
  };


  constructor(private route: ActivatedRoute, private loginService: LoginService, private cdr: ChangeDetectorRef,
    private orderPipe: OrderPipe) {
    this.sortedCollection = orderPipe.transform(this.issueList, this.order);
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.userId = params["userId"];
      }
    );
    this.getAllIssuePerUser();
    this.getProject(this.loginService.userId);
  }

  getAllIssuePerUser() {
    this.loginService.getAllIssuePerUser(this.loginService.userId).subscribe(response => {
      this.issueList = response as Issue[];
      this.cdr.markForCheck();
    })
  }

  setIssueFlag(issue?: Issue) {
    
    if (issue != null) {
      this.issue = issue;
         } else {
      this.issue = null;
    }
    this.setIssueForm(true);
  }

  getProject(userId: number) {
    this.loginService.getProjectPerOrg(this.loginService.organisation)
      .subscribe(response => {
        this.projectList = <Project[]>response;
        console.log(this.projectList);
      });

  }

  setIssueForm(flag: boolean) {
    this.issueForm = flag;
  }

  generateCsv() {
    this.getAllIssuePerUser();
    this.cdr.markForCheck();
    let icsv: Issuecsv = {} as Issuecsv;
    this.issueCsv = [];
    if (this.exportAll) {
      this.issueList.forEach(x => {
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
      this.issueList.forEach(x => {
        if (x.issueId in this.exportList) {
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


}
