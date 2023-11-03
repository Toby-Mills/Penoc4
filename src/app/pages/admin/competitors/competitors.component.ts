import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, debounceTime } from 'rxjs';
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
  public allCompetitorsDisplayed: boolean = false;
  public searchText: string = "";
  private searchTextSubject: Subject<string> = new Subject<string>;

  public constructor(
    private router: Router,
    private dataService: DataCacheService,
    private toasterService: ToasterService,
  ) { }

  ngOnInit(): void {
    this.loadAllCompetitors('');
    this.searchTextSubject.pipe(debounceTime(500)).subscribe((searchText) => {
      this.loadAllCompetitors(searchText);
    })
  }

  loadAllCompetitors(searchText: string) {
    this.displayedCompetitors = [];
    this.dataService.getAllCompetitors().subscribe((competitors) => {
      let searchTextStandardised: string = this.standardSearchString(searchText);
      if (searchTextStandardised != "") {
        this.notDisplayedCompetitors = competitors.filter((competitor) => {
          return this.standardSearchString(competitor.fullName).includes(searchTextStandardised)
        })
      } else { this.notDisplayedCompetitors.push(...competitors); }
      this.allCompetitorsDisplayed = false;
      this.displayMoreCompetitors(100);
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
    if (!this.allCompetitorsDisplayed) {
      this.displayMoreCompetitors(100);
    }
  }

  public onSearchTextChanged() {
    this.searchTextSubject.next(this.searchText)
  }

  private standardSearchString(searchString: string) {
    let returnString: string = searchString;

    returnString = returnString.toLowerCase();
    returnString = returnString.trim();
    returnString = returnString.replace(/the/g, '');
    returnString = returnString.replace(/one/g, '1');
    returnString = returnString.replace(/two/g, '2');
    returnString = returnString.replace(/three/g, '3');
    returnString = returnString.replace(/four/g, '4');
    returnString = returnString.replace(/five/g, '5');
    returnString = returnString.replace(/\\|\"|\'|\(|\)|\!|\_|\*/g, '');
    returnString = returnString.replace(/group|grp|family|team/g, '*');
    returnString = returnString.replace(/and|\&|\+/g, '');
    returnString = returnString.replace(/ /g, '');

    return returnString;
  }
}
