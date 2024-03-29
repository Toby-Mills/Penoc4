import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OEventResults } from 'src/app/models/oevent-results';

@Component({
  selector: 'app-oevent-summary',
  templateUrl: './oevent-summary.component.html',
  styleUrls: ['./oevent-summary.component.css']
})
export class OEventSummaryComponent implements OnInit {
@Input() public oEventResults:OEventResults = new OEventResults;
@Output() public oEventClicked:EventEmitter<number> = new EventEmitter;

  constructor() { }

  ngOnInit(): void {
  }
public onOEventClicked(){
  this.oEventClicked.emit(this.oEventResults.oEvent?.id);
}
}
