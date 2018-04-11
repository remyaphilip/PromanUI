import { Component, OnInit } from '@angular/core';
//import { link } from './link';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  // navLinks = [
  //   new link('Home', '')
  //   , new link('Project', 'project')
  //   , new link('Issue', 'issue')
  //   , new link('Group', 'group')
  //   ,new link('invite', 'invite')
  // ];
  constructor() {
    

  }

  ngOnInit() {
  }

}
