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

  // navLinks = [
  //   new link('Home','home')
  //   , new link('Project', 'project')
  //   , new link('Issue', 'issue')
  //   , new link('Group', 'group')
  //   , new link('invite', 'invite')
  // ];

  projectList: Nav[] = [];
  project: Project[] = [];
  projectListStat: boolean = false;
  prevProjectListStat: boolean = false;
  userId: number = 2;


  constructor(public loginService: LoginService, private router: Router) {
    
    
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



  // routerLinkProject(projectName: string) {
  //   this.router.navigate['/project'];
  // }

}