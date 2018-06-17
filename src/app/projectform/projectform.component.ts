import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Project } from '../interface/project';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-projectform',
  templateUrl: './projectform.component.html',
  styleUrls: ['./projectform.component.scss']
})
export class ProjectformComponent implements OnInit {

   @Input() project?: Project;
   @Output() projectForm = new EventEmitter<boolean>();
  form: FormGroup;
  insertProject = {} as Project;
  constructor(public loginService: LoginService) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('')
    });
    this.getFormValue();
  }

  sendEvent() {
    this.projectForm.emit(false);
  }

  getFormValue() {
    if (this.project != null) {
      this.form.patchValue({
        name: this.project.name
      });
    }
  }


  addProject() {
    if (this.project.projectId) {
      this.insertProject = this.form.value as Project;
      this.loginService.EditProject(this.project)
        .subscribe(response => {
          if (response == true) alert("Changes saved");
          this.sendEvent();
        });
    }
    else {
      this.insertProject = this.form.value;
      this.insertProject.organisation = this.loginService.organisation;
      console.log(this.insertProject);
      this.loginService.AddProject(this.insertProject).subscribe(response => {
        if (response == true) alert("New project added");
        this.sendEvent();
      })
    }
  }

  removeProject() {
    if (this.project.projectId) {
      this.loginService.RemoveProject(this.project.projectId).subscribe(response => {
        if (response == true) alert("Project deleted");
        this.sendEvent();
      })
    }
  }



}
