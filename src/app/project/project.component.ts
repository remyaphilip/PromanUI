import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Nav } from '../sidenav/nav';
import { Project } from '../interface/project';
import { Board } from '../interface/board';
import { LoginService } from '../login.service';



@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})

export class ProjectComponent implements OnInit {

  constructor(private route: ActivatedRoute, private _loginService: LoginService) { }

  ngOnInit() {
    this.getParams();
    this.getBoard(this.project.projectId);

  }
  ngOnDestroy(): void {
   
    this.temp.unsubscribe();
    this.temp1.unsubscribe();
  }
  project = <Project>{};
  temp: any;
  temp1: any;
  board = <Board>{};

  getParams() {
    this.temp = this.route.params
      .subscribe(response => {
        this.project = response as Project;
      });
  }

  getBoard(projectId: number) {
    this.temp1 = this._loginService.getBoard(projectId).subscribe(data => {
      this.board = data as Board;
      console.log(this.board);
    })
  }

}
