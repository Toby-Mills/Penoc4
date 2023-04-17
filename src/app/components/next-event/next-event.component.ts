import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { OEvent } from 'src/app/models/oevent.model';
import { DataCacheService } from 'src/app/services/data-cache.service';

@Component({
  selector: 'app-next-event',
  templateUrl: './next-event.component.html',
  styleUrls: ['./next-event.component.css']
})
export class NextEventComponent implements OnInit {
  @Output() eventClick = new EventEmitter<number>();
  public nextEvent: OEvent = new OEvent();
  constructor(public dataCache: DataCacheService) { }

  ngOnInit(): void {
    if (this.dataCache.nextOEvent == undefined) {
      this.dataCache.loadNextOEvent()
    }
  }

  public nextEventClicked() {
    if(this.dataCache.nextOEvent){
      this.eventClick.emit(this.dataCache.nextOEvent.id);
    }
  }

}
