import { Component, OnInit } from '@angular/core';
import { User } from '../interface/user';
import { LoginService } from '../login.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./util.css', './login.component.scss']
})
export class LoginComponent implements OnInit {
  user;
  email;
  passwordHash;
  accessApplication: boolean = false;
  login : boolean;

  constructor(private _loginService: LoginService,
  private router: Router) { 
    this.login = _loginService.login;
  }

  
  ngOnInit() {

  }

  onLogin(email: string, passwordHash: string) {
    this._loginService.getLogin(email, passwordHash)
      .subscribe((response: User) => {
        this.user = response;
        this._loginService.userId = this.user.userId;
        this.accessApplication = this.user ? true : false;
        this._loginService.login=false;
        this.router.navigate(['']);
      });

  }
}
