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

  lists: List[] = [];
  cardForm: boolean = true;
  temp1: any;
  temp: any;
  board = <Board>{};

  constructor(private _loginService: LoginService) {

  }

  ngOnInit() {
    this.getBoard(this._loginService.projectId);
  }

  cardFormEditMode() {


  }

  now(){
    return new Date().toDateString();
  }

  getBoard(projectId: number) {
    this.temp1 = this._loginService.getBoard(projectId).subscribe(data => {
      this.board = data as Board;
      this.getList(this.board.boardId);
    })

  }

  getList(boardId: number) {
    this.temp = this._loginService.getList(boardId).subscribe(response => {
      this.lists = <List[]>response;
    })

  }
}
