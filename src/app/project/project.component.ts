import { Component, OnInit, Input,AfterViewInit,ViewChild } from '@angular/core';
import { LoginService } from '../login.service';
import { UserHasProjectId } from '../interface/userhasprojectid';
import { Nav } from '../sidenav/nav';
import { Project } from '../interface/project';
import { Button } from 'protractor';
import { markParentViewsForCheck } from '@angular/core/src/view/util';
import { SidenavComponent } from '../sidenav/sidenav.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})

export class ProjectComponent implements OnInit,AfterViewInit {

  @ViewChild(SidenavComponent)
  private sidenavComponent: SidenavComponent;

  ngAfterViewInit() {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    //this.sidenavprjt = this.sidenavComponent.curtrgt;
  }
  userId;
  project: Project[];
  navs: Nav[] = [];
  sidenavlistitem: Nav[] = [];
  sidenavvalue: string;
  sidenavprjt: string;
  

  constructor(public _loginService: LoginService) { }

  ngOnInit() {
    //this.getProject(2);
    //console.log(this.sidenavvalue);
  }

  getProject(userId: number) {
    this._loginService.getProjectPerUser(userId)
      .subscribe(response => {
        this.project = response as Project[];
        this.project.forEach(
          (item: Project, index) => {
            this.navs.push({ name: item.name });
          }
        );
      });
  }

  onClick(event: boolean) {
    console.log(event);
    if (event === true ) {
      
      this.sidenavlistitem.push({ name: "Board" },
                                { name: "Issues" })
      //console.log(this.sidenavlistitem);
                                                            }
  }



}
