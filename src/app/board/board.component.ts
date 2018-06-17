import { Component, OnInit } from '@angular/core';
import { Board } from '../interface/board';
import { LoginService } from '../login.service';
import { List } from '../interface/list';
import { Card } from '../interface/card';
import { User } from '../interface/user';
import { Router, RouterLink } from '@angular/router';
import { NgSwitch } from '@angular/common';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  lists: List[] = [];
  list: List = null;
  userList: User[] = [];
  card = <Card>{};
  cardForm: boolean = false;
  board = <Board>{};
  boardFlag: boolean;

  constructor(private loginService: LoginService, private router: Router) {
    this.getBoard(this.loginService.projectId);

  }

  ngOnInit() {
    this.getAllUserPerProject(this.loginService.projectId);
    this.getlist();
  }

  getAllUserPerProject(projectId: number) {
    this.loginService.getAllUserPerProject(this.loginService.projectId).subscribe(response => {
      this.userList = response as User[];
    })
  }

  getBoard(projectId: number) {
    this.loginService.getBoard(projectId).subscribe(data => {
      this.board = data as Board;
    })

  }

  getlist() {
    this.loginService.getlist(this.loginService.projectId).subscribe(response => {
      this.lists = <List[]>response;
      console.log(this.lists);
      // this.lists.forEach(list =>
      //   list.card.forEach(element => {
      //     element.listId = list.listId;
      //   }))
    })
  }

  getProjectIssue() {
    this.boardFlag = false;
    this.router.navigate(['projectitem', this.boardFlag]);

  }

  setCardFlag(card?: Card, list?: List) {

    if (card != null) {
      this.card = card;
      this.list = list;
    } else {
      this.card = null;
    }
    this.setCardForm(true);
  }

  setCardForm(flag: boolean) {
    this.cardForm = flag;
  }
}
