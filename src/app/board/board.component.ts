import { Component, OnInit, Input } from '@angular/core';
import { Board } from '../interface/board';
import { LoginService } from '../login.service';
import { List } from '../interface/list';
import { Card } from '../interface/card';
import { User } from '../interface/user';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  list: List[] = [];
  userList: User[] = [];
  card = <Card>{};
  cardForm: boolean = false;
  issueForm: boolean = false;
  temp; temp1; temp2; temp3: any;
  board = <Board>{};
  form: FormGroup;
  post: any;
  res: Card;
  boardFlag: boolean;

  constructor(private _loginService: LoginService, private router: Router) {
    this.getBoard(this._loginService.projectId);
  }

  ngOnInit() {
    this.getAllUserPerProject(this._loginService.projectId);
    this.form = new FormGroup({
      summary: new FormControl(''),
      description: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      listId: new FormControl(''),
      assignedToId: new FormControl('')
    });
  }

  addCard(post) {
    this.card = this.form.value;
    this.card.reportedById = this._loginService.userId;
    this.card.projectId = this._loginService.projectId;
    this.temp3 = this._loginService.AddCard(post.listId, this.card).subscribe(response => {
      this.res = response as Card;
    })

  }

  getAllUserPerProject(projectId: number) {
    this.temp2 = this._loginService.getAllUserPerProject(this._loginService.projectId).subscribe(response => {
      this.userList = response as User[];
    })
  }

  getBoard(projectId: number) {
    this.temp1 = this._loginService.getBoard(projectId).subscribe(data => {
      this.board = data as Board;
      this.getList(this.board.boardId);
    })

  }

  boardOnClick() {
    this.getBoard(this._loginService.projectId);
  }
  getList(boardId: number) {
    this.temp = this._loginService.getList(boardId).subscribe(response => {
      this.list = <List[]>response;
    })

  }
  getProjectIssue(){
    this.boardFlag = false;
   this.router.navigate(['projectitem', this.boardFlag ]);
   
  }
}
