import { Component, OnInit } from '@angular/core';
//import { LoginService } from '../login.service';
import { SharedService } from '../shared.service';
import { User } from '../interface/user';

@Component({
  selector: 'app-login',
  providers: [SharedService],
  templateUrl: './login.component.html',
  styleUrls: ['./util.css','./login.component.scss']
})
export class LoginComponent implements OnInit {
  user;
  email;
  passwordHash;
  constructor(private _sharedService: SharedService) { }

  ngOnInit() {
    
  }

  onLogin(email: string, passwordHash: string) {
    this._sharedService.getLogin(email, passwordHash)
      .subscribe((response: User) => {
        this.user = response;
      });
    console.log(this.user);
  }
}
