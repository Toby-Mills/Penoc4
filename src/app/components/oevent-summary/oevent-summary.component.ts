import { Component, Input, OnInit } from '@angular/core';
import { OEventSummary } from 'src/app/models/oevent-summary';

@Component({
  selector: 'app-oevent-summary',
  templateUrl: './oevent-summary.component.html',
  styleUrls: ['./oevent-summary.component.css']
})
export class OEventSummaryComponent implements OnInit {
@Input() public oeventSummary:OEventSummary = new OEventSummary;

  constructor() { }

  ngOnInit(): void {
  }

}
