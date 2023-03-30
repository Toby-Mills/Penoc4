import { Component, Input, OnInit } from '@angular/core';
import { OEventResults } from 'src/app/models/oevent-results';

@Component({
  selector: 'app-oevent-results',
  templateUrl: './oevent-results.component.html',
  styleUrls: ['./oevent-results.component.css']
})
export class OeventResultsComponent implements OnInit {
@Input() public oEventResults: OEventResults = new OEventResults;

  constructor() { }

  ngOnInit(): void {
  }

}
