import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Nav } from '../sidenav/nav';
import { Project } from '../interface/project';
import { LoginService } from '../login.service';





@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})

export class ProjectComponent {


  projectList: Project[] = [];
  projectColumn: string[];
  boardFlag: boolean;
  projectForm: boolean = false;
  form: FormGroup;
  project: Project;

  constructor(private router: Router, private _loginService: LoginService) {

  }
  ngOnInit(): void {
    //this._loginService.userId = 2;
    
    this.form = new FormGroup({
      name: new FormControl('')
    });
    this.getProject(this._loginService.userId);
    // this.getParams();

  }

  getProject(userId: number) {
    this._loginService.getProjectPerOrg(this._loginService.organisation)
      .subscribe(response => {
        this.projectList = <Project[]>response;
        this.projectColumn = this.getProjectColumn();
      });

  }

  getProjectColumn(): string[] {
    return ["projectId", "name"]
  }

  setProject(projectId: number) {
    this._loginService.projectId = projectId;
    this._loginService.projectName = this.projectList.find(p => p.projectId == projectId).name;
    this.boardFlag = true;
    this.router.navigate(['projectitem', this.boardFlag]);

  }

  setProjectForm() {
    this.projectForm = true;
  }
  addProject(){
   this.project=this.form.value;
   this.project.organisation = this._loginService.organisation;
   console.log(this.project);
   this._loginService.AddProject(this.project).subscribe(res => {
     console.log(res)
   });
  }



}
