import { Component, OnInit } from '@angular/core';
import { OEvent } from 'src/app/models/oevent.model';
import { PenocApiService } from 'src/app/services/penoc-api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-notice',
  templateUrl: './event-notice.component.html',
  styleUrls: ['./event-notice.component.css'],
})
export class EventNoticeComponent implements OnInit {
  public eventId: number = 0;
  public oevent: OEvent = new OEvent();

  constructor(private api: PenocApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.loadEvent(Number(this.route.snapshot.paramMap.get('oEventId')));
  }

  public loadEvent(oeventId: number) {
    this.api.getOEvent(oeventId).subscribe(result => {this.oevent = result;})
  }
}
