import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, debounceTime } from 'rxjs';
import { AddEditCompetitorComponent } from 'src/app/components/add-edit-competitor/add-edit-competitor.component';
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
  private allCompetitorsSubject: BehaviorSubject<Competitor[]> = new BehaviorSubject<Competitor[]>([]);
  public searchText: string = "";
  private searchTextSubject: Subject<string> = new Subject<string>;

  public constructor(
    private router: Router,
    private dataService: DataCacheService,
    private toasterService: ToasterService,
    private dialog: Dialog,
  ) { }

  ngOnInit(): void {
    this.loadAllCompetitors();
    this.searchTextSubject.pipe(debounceTime(500)).subscribe((searchText) => {
      this.dataService.searchAllCompetitors(searchText).subscribe(results => {
        this.displayedCompetitors = [];
        this.notDisplayedCompetitors = results;
        this.displayMoreCompetitors(100);
      });

    })
  }

  loadAllCompetitors() {
    this.allCompetitorsSubject = this.dataService.getAllCompetitors();
    this.allCompetitorsSubject.subscribe((competitors) => {
      this.displayedCompetitors = [];
      this.notDisplayedCompetitors = [];
      this.notDisplayedCompetitors.push(...competitors)
      this.allCompetitorsDisplayed = false;
      this.dataService.searchAllCompetitors(this.searchText).subscribe(results =>{
        this.notDisplayedCompetitors = results;
        this.displayMoreCompetitors(100);
      });
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

  hideAllCompetitors() {
    this.notDisplayedCompetitors.push(...this.displayedCompetitors)
    this.allCompetitorsDisplayed = false;
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

  onEditClick(competitorId: number) {
    const dialogRef = this.dialog.open(AddEditCompetitorComponent, {
      height: '400px',
      width: '600px',
      data: { competitorToEditId: competitorId }
    })
    dialogRef.componentInstance?.newCompetitor.subscribe((competitor) => {

    });
    dialogRef.componentInstance?.cancel.subscribe(() => {

    })
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


}
