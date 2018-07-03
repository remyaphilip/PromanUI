import { Component, OnInit } from '@angular/core';
//import { link } from './link';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';


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

  dropdownEnabled: boolean = false;
  constructor(public loginservice: LoginService, public router:Router) {


  }

  ngOnInit() {
  }
  dropDown() {
    if (this.dropdownEnabled) {
      this.dropdownEnabled = false;
    }
    else {
      this.dropdownEnabled = true;
    }

  }

  logOut(){
    this.loginservice.logOut().subscribe();
    localStorage.setItem("loggedIn","false");
    this.router.navigate(['login']);
  }

  loggedIn(){
    // return this.authService.loggedIn()
  }
}