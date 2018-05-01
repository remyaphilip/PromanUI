import { Component, OnInit } from '@angular/core';
import { link } from './navbar/link';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(private _loginService: LoginService, private router: Router) {
    //this._loginService.login = true;
  }

  ngOnInit() {
   // this._loginService.login = true;
  }

  loggedIn(): boolean {
    return (this._loginService.userId != null);
  }

}