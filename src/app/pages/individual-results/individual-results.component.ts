import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Competitor } from 'src/app/models/competitor';
import { Result } from 'src/app/models/result';
import { DataCacheService } from 'src/app/services/data-cache.service';
import { PenocApiService } from 'src/app/services/penoc-api.service';

@Component({
  selector: 'app-individual-results',
  templateUrl: './individual-results.component.html',
  styleUrls: ['./individual-results.component.css']
})
export default class IndividualResultsComponent implements OnInit {
  competitor: Competitor = new Competitor();
  results: Result[] = [];
  public narrowScreen: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private titleService: Title, private api: PenocApiService, private dataCache: DataCacheService) { }

  ngOnInit(): void {
    this.titleService.setTitle('PenOC | Competitor Results');
    let competitorId = Number(this.route.snapshot.paramMap.get('competitorId'));

    this.dataCache.getCompetitor(competitorId).subscribe(data => this.competitor = data);
    this.api.getCompetitorResults(competitorId).subscribe(data => this.results = data);
  }

  public onEventClick(eventId: number){
    this.router.navigate(['/event-results', eventId]);
  }

}
