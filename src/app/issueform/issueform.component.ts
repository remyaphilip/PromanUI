import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Issue } from '../interface/issue';
import { LoginService } from '../login.service';
import { Project } from '../interface/project';
import { delay } from 'q';

@Component({
  selector: 'app-issueform',
  templateUrl: './issueform.component.html',
  styleUrls: ['./issueform.component.scss']
})
export class IssueformComponent implements OnInit {

  @Input() issue?: Issue;
  @Input() projectList: Project[];;
  @Output() issueForm = new EventEmitter<boolean>();
  form: FormGroup;
  insertIssue = {} as Issue;
  constructor(public loginService: LoginService) {

  }

  ngOnInit() {
    this.setForm();
    this.getFormValue();

  }

  setForm() {
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
  }

  sendEvent() {
    this.form.reset();
    this.issueForm.emit(false);
  }

  getFormValue() {
    if (this.issue != null) {
      this.form.patchValue({
        projectName: this.projectList.find(p => p.projectId == this.issue.projectId).name,
        statusCode: this.issue.statusCode,
        priorityCode: this.issue.priorityCode,
        startDate: this.issue.startDate,
        endDate: this.issue.endDate,
        dueDate: this.issue.dueDate,
        assignToId: this.issue.assignToId,
        summary: this.issue.summary,
        description: this.issue.description
      });
    }
  }


  addIssue() {
    if (this.issue != null) {
      this.insertIssue = this.form.value as Issue;
      this.loginService.EditIssue(this.issue.issueId, this.issue.projectId, this.insertIssue)
        .subscribe(response => {
          if (response == true) alert("Changes saved");
          this.sendEvent();
        });
    }
    else {
      this.insertIssue = this.form.value;
      this.insertIssue.projectId = this.projectList.find(p => p.name == this.form.get('projectName').value).projectId;
      this.loginService.AddIssue(this.insertIssue.projectId, this.insertIssue).subscribe(response => {
        if (response == true) alert("New issue added");
        this.sendEvent();
      })
    }
  }

  removeIssue() {
    if (this.issue != null) {
      this.loginService.RemoveIssue(this.issue.issueId).subscribe(response => {
        if (response == true) alert("Issue Deleted");
        this.sendEvent();
      })
    }
  }

  getProject(userId: number) {
    this.loginService.getProjectPerOrg(this.loginService.organisation)
      .subscribe(response => {
        this.projectList = <Project[]>response;
      });

  }

  upLoad(files: FileList) {
    this.loginService.UpLoadFile(files);
  }

}
