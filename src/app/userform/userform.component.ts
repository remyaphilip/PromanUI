import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from '../interface/user';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.scss']
})
export class UserformComponent implements OnInit {

  @Input() user?: User;
  @Output() userForm = new EventEmitter<boolean>();
  form: FormGroup;
  insertUser = {} as User;
  
  constructor(public loginService: LoginService) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      userRole: new FormControl(''),
      userName: new FormControl(''),
      passwordHash: new FormControl(''),
    });
    this.getFormValue();
  }

  sendEvent() {
    this.userForm.emit(false);
  }

  getFormValue() {
    if (this.user != null) {
      this.form.patchValue({
        name: this.user.name,
        email: this.user.email,
        userRole: this.user.userRole,
        userName: this.user.userName,
        passwordHash: this.user.passwordHash
      });
    }
  }

  
  addUser() {
    if (this.user != null) {
      this.insertUser = this.form.value as User;
      this.loginService.EditUser(this.user.userId, this.insertUser)
        .subscribe(response => {
          console.log('test');
          if (response == true) alert("Changes saved");
          this.sendEvent();
        });
    }
    else {
      this.insertUser = this.form.value;
      this.insertUser.organisation = this.loginService.organisation;
      this.loginService.AddUser(this.insertUser).subscribe(response => {
        if (response == true) alert("New user added");
        this.sendEvent();
      })
    }
  }

  removeUser() {
    if (this.user != null) {
      console.log('remove');
      this.loginService.RemoveUser(this.user.userId).subscribe(response => {
        console.log(response);
      })
    }
  }
}


