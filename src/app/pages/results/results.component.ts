import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PenocApiService } from 'src/app/services/penoc-api.service';
import { Title } from '@angular/platform-browser';
import { DataCacheService } from 'src/app/services/data-cache.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  constructor(private api: PenocApiService, private router: Router, private titleService: Title, public dataCache: DataCacheService) { }

  ngOnInit(): void {
    this.titleService.setTitle('PenOC | Results');
    if (this.dataCache.oEventResultSummaries.length == 0) {
      this.dataCache.addMoreOEventResultSummaries(10)
    }
  }

  public onLoadingCardVisible(event: any) {
    this.dataCache.addMoreOEventResultSummaries(10);
  }

  public onEventClicked(event: any) {
    this.router.navigate(['event-results', event])
  }
}
