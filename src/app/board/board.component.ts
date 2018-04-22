import { Component, OnInit, Input } from '@angular/core';
import { Board } from '../interface/board';
import { LoginService } from '../login.service';
import { List } from '../interface/list';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  @Input() lists: List[] =[];
 

  ngOnInit() {

  }
}
