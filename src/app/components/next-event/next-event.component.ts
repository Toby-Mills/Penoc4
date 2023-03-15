import { Component, OnInit } from '@angular/core';
import { OEvent } from 'src/app/models/oevent.model';
import { PenocApiService } from 'src/app/services/penoc-api.service';

@Component({
  selector: 'app-next-event',
  templateUrl: './next-event.component.html',
  styleUrls: ['./next-event.component.css']
})
export class NextEventComponent implements OnInit {
  public nextEvent: OEvent = new OEvent();
  constructor(private api: PenocApiService) { }

  ngOnInit(): void {
    this.api.getOEvents(undefined, undefined, new Date()).subscribe(result => {
      if (result.length > 0) {
        this.nextEvent = result[0]
      } else {
        this.nextEvent = new OEvent();
      }

    })
  }

}
