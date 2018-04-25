import { Component } from '@angular/core';
import { SharedService} from './shared.service';
import { link } from './navbar/link';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
 providers: [SharedService],
  templateUrl: './app.component.html'
})
export class AppComponent {
 
constructor(private _loginService: LoginService,private router: Router){
  if(_loginService.login == true)
  router.navigate['login'];
  else
  router.navigate[''];
  
}
 

  loggedIn(): boolean{
    console.log(this._loginService.userId);
    return (this._loginService.userId!=null);
  }

}