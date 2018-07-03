import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { User } from '../interface/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  userList: User[];
  user: User;
  userFlag: string;
  userForm: boolean;
  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.getAllUsers();
  }
  getAllUsers() {
    
    this.loginService.GetAllUsers(this.loginService.organisation)
      .subscribe(response => {
        this.userList = response as User[];
      });
  }
  setUserFlagAddUser(user?: User) {
  
    this.setUserForm(true);
    if (user){
      this.user = user;
    }else
    this.user=null;
  }
  setUserForm(flag:boolean){
    this.userForm =flag;
  }
}
