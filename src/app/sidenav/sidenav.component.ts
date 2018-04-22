import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Nav } from './nav';
import { LoginService } from "../login.service";
import { Project } from '../interface/project';
import { link } from '../navbar/link'
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']

})

export class SidenavComponent implements OnInit {

  navLinks = [
    new link('Home', '')
    , new link('Project', 'project')
    , new link('Issue', 'issue')
    , new link('Group', 'group')
    , new link('invite', 'invite')
  ];

  projectList: Nav[] = [];
  project: Project[] = [];
  projectListStat: boolean = false;
  prevProjectListStat: boolean = false;
  userId: number = 2;


  constructor(public _loginService: LoginService, private router: Router) {
    this.getProject(2);
    
  }

  ngOnInit() {

  }

  onClick() {
    if (this.projectListStat == true) {
      this.projectListStat = false;
    }
    else
      this.projectListStat = true;
    
  }

  getProject(userId: number) {
    this._loginService.getProjectPerUser(userId)
      .subscribe(response => {
        this.project = <Project[]>response;
        console.log(this.project);
       
        // this.project.forEach(
        //   (item: Project, index) => {
        //     this.projectList.push({ name: item.name });
        //   }
        // );
      });

  }

  // routerLinkProject(projectName: string) {
  //   console.log(projectName);
  //   this.router.navigate['/project'];
  // }

}