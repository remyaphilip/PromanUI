import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { User } from '../interface/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  temp: any;
  userList: User[];
  userFlag: string;
  userForm: boolean;
  constructor(private _loginService: LoginService) { }

  ngOnInit() {
    this.getAllUsers();
  }
  getAllUsers() {
    console.log(this._loginService.organisation);
    this.temp = this._loginService.GetAllUsers(this._loginService.organisation)
      .subscribe(response => {
        this.userList = response as User[];
        console.log(this.userList);
      });
  }
  setUserFlagAddUser() {
    this.userFlag = "Add";
    this.userForm = true;
   // this.form.reset();
  }
}
