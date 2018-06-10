import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
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
  boardFlag: boolean;
  dropDown: boolean[] = [];
  sIndex: number;
  projectForm: boolean = false;
  project: Project;

  constructor(private router: Router, private loginService: LoginService) {

  }
  ngOnInit(): void {
    this.getProject(this.loginService.userId);
  }

  getProject(userId: number) {
    this.loginService.getProjectPerOrg(this.loginService.organisation)
      .subscribe(response => {
        this.projectList = <Project[]>response;
        this.dropDown.length = this.projectList.length;
      });

  }

  setProject(projectId: number) {
    this.loginService.projectId = projectId;
    this.loginService.projectName = this.projectList.find(p => p.projectId == projectId).name;
    this.boardFlag = true;
    this.router.navigate(['projectitem', this.boardFlag]);

  }
  editProjectForm(project: Project, flag: boolean,index:number) {
    this.project = project;
    this.setDropDown(index)
    this.setProjectForm(flag);
  }

  setProjectForm(flag: boolean) {
    this.projectForm = flag;
  }


  setDropDown(index: number) {
    if (this.dropDown[index] == true) {
      this.dropDown[index] = false
    }
    else {
      this.dropDown[index] = true;
    }
    for (let i = 0; i < this.dropDown.length; i++) {
      if (i != index)
        this.dropDown[i] = false;
    }
  }



}
