import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastMessageType } from 'src/app/components/toaster/toaster.component';
import { Competitor } from 'src/app/models/competitor';
import { DataCacheService } from 'src/app/services/data-cache.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-competitors',
  templateUrl: './competitors.component.html',
  styleUrls: ['./competitors.component.css']
})
export class CompetitorsComponent implements OnInit {
  public competitors: Competitor[] = [];

  public constructor(
    private router: Router,
    private dataService: DataCacheService,
    private toasterService: ToasterService,
  ) { }

  ngOnInit(): void {
    this.dataService.getAllCompetitors().subscribe((competitors) => {
      this.competitors = competitors;
    })
  }

  onDeleteClick(competitorId: number) {
    this.dataService.getCompetitorResults(competitorId).subscribe(
      results => {
        if (results.length > 0) {
          this.toasterService.showToast('Unable to delete competitor as they have one or more Results', ToastMessageType.Failure, 0);
        } else {
          this.dataService.deleteCompetitor(competitorId).subscribe();
        }
      }
    )
  }

  onResultsClick(competitorId: number) {
    this.router.navigate([`/individual-results/`, competitorId]);
  }
}
