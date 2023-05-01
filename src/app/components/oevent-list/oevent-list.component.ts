import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OEvent } from 'src/app/models/oevent.model';

@Component({
  selector: 'app-oevent-list',
  templateUrl: './oevent-list.component.html',
  styleUrls: ['./oevent-list.component.css']
})
export class UpcomingOeventsComponent implements OnInit {
  @Input() public oevents: Array<OEvent> | undefined = [];
  @Output() public oeventClicked: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public onOeventClicked(oeventId: number) {
    this.oeventClicked.emit(oeventId);
  }
}
