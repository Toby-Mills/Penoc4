import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OEventResults } from 'src/app/models/oevent-results';
import { Title } from '@angular/platform-browser';
import { DataCacheService } from 'src/app/services/data-cache.service';

@Component({
  selector: 'app-event-results',
  templateUrl: './event-results.component.html',
  styleUrls: ['./event-results.component.css']
})
export class EventResultsComponent implements OnInit {
  public eventId: number = 0;
  public oEventSummary: OEventResults = new OEventResults();

  constructor(private route: ActivatedRoute, private router: Router, private titleService: Title, private dataCache: DataCacheService) { }

  ngOnInit(): void {
    this.titleService.setTitle('PenOC | Event Results');
    this.oEventSummary = new OEventResults();
    this.dataCache.getOEventResults(Number(this.route.snapshot.paramMap.get('oEventId'))).subscribe(data => this.oEventSummary = data);
  }

  public onCompetitorClicked(competitorId: number){
    this.router.navigate(['/individual-results',competitorId]);
  }
}
