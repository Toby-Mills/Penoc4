import { Component, Input, OnInit } from '@angular/core';
import { Result } from 'src/app/models/result';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.css']
})
export class ResultListComponent implements OnInit {
@Input() results?:Array<Result>;

  constructor() { }

  ngOnInit(): void {
  }

}
