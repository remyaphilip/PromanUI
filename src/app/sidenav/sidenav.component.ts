import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Nav } from './nav';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})

export class SidenavComponent implements OnInit {

  @Input() navs: Nav[] = [];
  @Input() sidenavlistitem: Nav[] = [];
  @Output() onClick = new EventEmitter<boolean>();
  hideme: Array<boolean> = [false];
  curtrgt: string;



  vote(i: number, curtargt: string) {
    this.curtrgt = curtargt
    this.hideme = [false];
    console.log(this.hideme);
    this.hideme[i] = true;
    console.log(this.hideme, curtargt);
    this.onClick.emit(true);

  }


  constructor() {
    console.log(this.sidenavlistitem);
  }

  ngOnInit() {
    console.log(this.hideme);
  }

}


