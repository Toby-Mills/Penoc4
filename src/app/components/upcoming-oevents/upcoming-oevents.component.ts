import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { OEvent } from 'src/app/models/oevent.model';
import { DataCacheService } from 'src/app/services/data-cache.service';

@Component({
  selector: 'app-upcoming-oevents',
  templateUrl: './upcoming-oevents.component.html',
  styleUrls: ['./upcoming-oevents.component.css']
})
export class UpcomingOeventsComponent implements OnInit {
  public oevents: Array<OEvent> = [];
  @Output() public oeventClicked: EventEmitter<number> = new EventEmitter();

  constructor(public dataCache:DataCacheService) { }

  ngOnInit(): void {
    if (this.dataCache.upcomingOEvents == undefined){
      this.dataCache.loadUpcomingOEvents();
    }
  }

  public onOeventClicked(oeventId: number) {
    this.oeventClicked.emit(oeventId);
  }
}
