import { Component, OnInit } from '@angular/core';
import { link } from './navbar/link';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) {
    //this.loginService.login = true;
  }

  ngOnInit() {
   // this.loginService.login = true;
  }

  loggedIn(): boolean {
    return (this.loginService.userId != null);
  }

  

}