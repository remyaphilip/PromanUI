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

  constructor(private loginService: LoginService,
    private router: Router) {
    this.loginService.login = true;
  }


  ngOnInit() {
    this.loginService.login = true;
  }

  onLogin(email: string, passwordHash: string) {
    console.log(email,passwordHash);
    this.loginService.getLogin(email, passwordHash)
      .subscribe((response: User) => {
        this.user = response;
        this.loginService.userId = this.user.userId;
        this.loginService.organisation = this.user.organisation;
        this.loginService.login = false;
        console.log(this.user)
        this.getAllUsers();
        this.router.navigate(['login']);
      });
  }

  getAllUsers() {
    this.temp = this.loginService.GetAllUsers(this.loginService.organisation)
      .subscribe(response => {
        this.loginService.userList = response as User[];
        console.log(this.loginService.userList);
      });
  }
}
