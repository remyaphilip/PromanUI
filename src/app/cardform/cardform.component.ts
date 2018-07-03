import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Card } from '../interface/card';
import { LoginService } from '../login.service';
import { FormGroup, FormControl } from '@angular/forms';
import { List } from '../interface/list';



@Component({
  selector: 'app-cardform',
  templateUrl: './cardform.component.html',
  styleUrls: ['./cardform.component.scss']
})
export class CardformComponent implements OnInit {

  @Input() card?: Card;
  @Input() list?: List;
  @Input() lists: List[];
  @Output() cardForm = new EventEmitter<boolean>();
  form: FormGroup;
  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.setForm();
    this.getFormValue();
  }

  setForm() {
    this.form = new FormGroup({
      summary: new FormControl(''),
      description: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      listName: new FormControl(''),
      assignedToId: new FormControl(''),
      cardId: new FormControl('')
    });
  }

  getFormValue() {
    if (this.card.cardId) {
      this.form.patchValue({
        summary: this.card.summary,
        description: this.card.description,
        startDate: this.card.startDate,
        endDate: this.card.endDate,
        listName: this.list.listName,
        assignedToId: this.card.assignedToId,
        cardId: this.card.cardId
      });
    }
  }


  addCard() {
    if (!this.card.cardId) {
      this.card = this.form.value;
      this.card.reportedById = this.loginService.userId;
      this.card.projectId = this.loginService.projectId;
      var temp =  this.form.get('listName').value;
      this.card.listId = this.lists.find(x => x.listName == temp).listId;
      this.loginService.AddCard(this.card.listId, this.card).subscribe(response => {
        if (response == true) alert("Changes saved");
        this.sendEvent();
      });
    }
    else {
      this.card = this.form.value as Card;
      var temp =  this.form.get('listName').value;
      this.card.listId = this.lists.find(x => x.listName == temp).listId;
      this.card.projectId = this.loginService.projectId;
      this.loginService.EditCard(this.card)
        .subscribe(response => {
          if (response == true) alert("Changes saved");
          this.sendEvent();
        });
    }
  }

  removeCard() {
    if (this.card.cardId) {
      this.loginService.RemoveCard(this.card.cardId).subscribe(response => {
        if (response == true) alert("Task deleted");
        this.sendEvent();
      })
    }
  }

  sendEvent() {
    this.cardForm.emit(false);
  }

}
