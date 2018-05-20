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
  temp: any;

  constructor(private _loginService: LoginService,
    private router: Router) {
    this._loginService.login = true;
  }


  ngOnInit() {
    this._loginService.login = true;
  }

  onLogin(email: string, passwordHash: string) {
    this._loginService.getLogin(email, passwordHash)
      .subscribe((response: User) => {
        this.user = response;
        this._loginService.userId = this.user.userId;
        this._loginService.organisation = this.user.organisation;
        this._loginService.login = false;
        this.getAllUsers();
        this.router.navigate(['login']);
      });
  }

  getAllUsers() {
    this.temp = this._loginService.GetAllUsers(this._loginService.organisation)
      .subscribe(response => {
        this._loginService.userList = response as User[];
        console.log(this._loginService.userList);
      });
  }
}
