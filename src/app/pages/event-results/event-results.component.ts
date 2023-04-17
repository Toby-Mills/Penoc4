import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OEventResults } from 'src/app/models/oevent-results';
import { PenocApiService } from 'src/app/services/penoc-api.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-event-results',
  templateUrl: './event-results.component.html',
  styleUrls: ['./event-results.component.css']
})
export class EventResultsComponent implements OnInit {
  public eventId: number = 0;
  public oEventSummary: OEventResults = new OEventResults();

  constructor(private api: PenocApiService, private route: ActivatedRoute, private router: Router, private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('PenOC | Event Results');
    this.loadEvent(Number(this.route.snapshot.paramMap.get('oEventId')));
  }

  public loadEvent(oeventId: number) {
    this.api.getOEventResultSummary(oeventId).subscribe(result => {this.oEventSummary = result;})
  }

}
