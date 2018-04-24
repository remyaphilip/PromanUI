import { Component } from '@angular/core';
import { SharedService} from './shared.service';

@Component({
  selector: 'app-root',
 providers: [SharedService],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Tour of Heroes';
}