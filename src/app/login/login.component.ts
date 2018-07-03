import { Component, OnInit } from '@angular/core';
import { User } from '../interface/user';
import { LoginService } from '../login.service';
import { Route, Router } from '@angular/router';
import { Credentials } from '../interface/credentials';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./util.css', './login.component.scss']
})
export class LoginComponent implements OnInit {
  user: User = {} as User;
  email;
  passwordHash;
  temp: any;

  credentials: Credentials = {} as Credentials;

  constructor(private loginService: LoginService,
    private router: Router) {
      // if(this.loggedIn()){
      //   router.navigate(['project']);
      // }
  }


  ngOnInit() {
  }

  // onLogin(email: string, passwordHash: string) {
  //   this.credentials.userName = email;
  //   this.credentials.password = passwordHash;
  //   this.loginService.authenticate(this.credentials, () => {
  //     this.router.navigateByUrl('/project')
  //   })
  //   return false;

  // }
  // onLogin(email: string, passwordHash: string) {
  //   this.loginService.getLogin(email, passwordHash)
  //     .subscribe((response: User) => {
  //       this.user = response;
  //       this.loginService.userId = this.user.userId;
  //       this.loginService.organisation = this.user.organisation;
  //       this.loginService.login = false;
  //       this.getAllUsers();
  //       this.router.navigate(['login']);
  //     });
  // }

  onLogin(email: string, passwordHash: string) {
    this.user.email = email;
    this.user.passwordHash = passwordHash;
    this.loginService.getLogin(this.user)
      .subscribe((response: string) => {
        // this.getAllUsers();
        this.loginService.login = false;
       this.router.navigate(['project']);
      });
  }

  loggedIn(){
    return localStorage.getItem('loggedIn') == 'true'
  }

  getAllUsers() {
    this.temp = this.loginService.GetAllUsers(this.loginService.organisation)
      .subscribe(response => {
        this.loginService.userList = response as User[];
      });
  }
}
