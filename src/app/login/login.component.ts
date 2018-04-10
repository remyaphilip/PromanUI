import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { User } from '../interface/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./util.css','./login.component.scss']
})
export class LoginComponent implements OnInit {
  user;
  email;
  passwordHash;
  constructor(private _loginService: LoginService) { }

  ngOnInit() {
    
  }

  onLogin(email: string, passwordHash: string) {
    this._loginService.getLogin(email, passwordHash)
      .subscribe((response: User) => {
        this.user = response;
      });
    console.log(this.user);
  }
}
