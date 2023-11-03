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
  public displayedCompetitors: Competitor[] = [];
  private notDisplayedCompetitors: Competitor[] = [];
  private allCompetitorsDisplayed: boolean = false;

  public constructor(
    private router: Router,
    private dataService: DataCacheService,
    private toasterService: ToasterService,
  ) { }

  ngOnInit(): void {
    this.dataService.getAllCompetitors().subscribe((competitors) => {
      this.notDisplayedCompetitors.push (...competitors);
      this.displayMoreCompetitors(100);
      this.allCompetitorsDisplayed = false;
    })
  }

  displayMoreCompetitors(quantity: number) {
    const itemsToMove = this.notDisplayedCompetitors.slice(0, quantity);
    this.notDisplayedCompetitors.splice(0, quantity);
    this.displayedCompetitors.push(...itemsToMove);
    if (this.notDisplayedCompetitors.length == 0) {
      this.allCompetitorsDisplayed = true;
    }
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

  public onLoadingCardVisible(event: any) {
    console.log(this.allCompetitorsDisplayed);
    if (!this.allCompetitorsDisplayed) {
      console.log('here');
      this.displayMoreCompetitors(100);
    }
  }
}
