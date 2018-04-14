import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Nav } from './nav';
import { LoginService } from "../login.service";
import { Project } from "../interface/project";
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
  project: Project[];
  projectName: string[] = [];
  projectListStat: boolean = false;


  // @Input() navs: Nav[] = [];
  // @Input() sidenavlistitem: Nav[] = [];
  // @Output() onClick = new EventEmitter<boolean>();
  // hideme: Array<boolean> = [false];
  // curtrgt: string;



  // vote(i: number, curtargt: string) {
  //   this.curtrgt = curtargt
  //   this.hideme = [false];
  //   console.log(this.hideme);
  //   this.hideme[i] = true;
  //   console.log(this.hideme, curtargt);
  //   this.onClick.emit(true);

  // }


  constructor(public _loginService: LoginService) {
    this.getProject(2);
  //  console.log(this.projectList);
  }

  ngOnInit() {
    
    //console.log(this.hideme);
  }

  onClick(){
    this.projectListStat = true;
    
  }

 getProject(userId: number) {
    this._loginService.getProjectPerUser(userId)
      .subscribe(response => {
        this.project = <Project[]>response;
        this.project.forEach(
          (item: Project, index) => {
            this.projectList.push({ name: item.name });
            this.projectName.push(item.name);
          }
        );
      });
      console.log(this.projectName);
  }



}


