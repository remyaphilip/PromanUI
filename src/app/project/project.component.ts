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
  projectColumn: string[];

  constructor(private router: Router, private _loginService: LoginService) {

  }
  ngOnInit(): void {
    this._loginService.userId = 2;
    this.getProject(this._loginService.userId);
    // this.getParams();

  }

  getProject(userId: number) {
    this._loginService.getProjectPerUser(userId)
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
    this.router.navigate(['project-item']);
  }



}
