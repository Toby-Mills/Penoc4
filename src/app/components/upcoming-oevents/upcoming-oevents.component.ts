import { Component, OnInit } from '@angular/core';
import { OEvent } from 'src/app/models/oevent.model';
import { PenocApiService } from 'src/app/services/penoc-api.service';

@Component({
  selector: 'app-upcoming-oevents',
  templateUrl: './upcoming-oevents.component.html',
  styleUrls: ['./upcoming-oevents.component.css']
})
export class UpcomingOeventsComponent implements OnInit {
  public oevents: Array<OEvent> = [];

  constructor(private api: PenocApiService) { }

  ngOnInit(): void {
    this.api.getOEvents(undefined, undefined, new Date).subscribe(result => this.oevents = result);
  }

}
