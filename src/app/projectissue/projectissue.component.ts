import { Component, OnInit, Input } from '@angular/core';
import { Issue } from '../interface/issue';

@Component({
  selector: 'app-projectissue',
  templateUrl: './projectissue.component.html',
  styleUrls: ['./projectissue.component.scss']
})
export class ProjectissueComponent implements OnInit {

  @Input() issueColumn: string[];
  @Input() issue: Issue[];
  constructor() { }

  ngOnInit() {
  }

}
