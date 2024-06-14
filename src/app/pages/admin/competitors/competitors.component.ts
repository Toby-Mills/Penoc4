import { Dialog } from '@angular/cdk/dialog';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, Subscription, debounceTime } from 'rxjs';
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
export class CompetitorsComponent implements OnInit, OnDestroy {
  public displayedCompetitors: Competitor[] = [];
  private notDisplayedCompetitors: Competitor[] = [];
  public allCompetitorsDisplayed: boolean = false;
  private allCompetitorsSubject: BehaviorSubject<Competitor[]> = new BehaviorSubject<Competitor[]>([]);
  public searchText: string = "";
  private searchTextSubject: Subject<string> = new Subject<string>;

  //subscription variables
  private allCompetitorsSubscription: Subscription | undefined;
  private searchCompetitorsSubscription: Subscription | undefined;
  private searchTextSubscription: Subscription | undefined;

  public mergeSource: Competitor | undefined;
  public mergeTarget: Competitor | undefined;
  public displayMergeDialog: boolean = false;

  public constructor(
    private router: Router,
    private dataService: DataCacheService,
    private toasterService: ToasterService,
    private dialog: Dialog,
  ) { }

  ngOnInit(): void {
    //this.allCompetitorsSubject = this.dataService.getAllCompetitors();
    //this.subscribeAllCompetitorsChanges();
    this.subscribeSearchTextChanges();
    this.subscribeCompetitorChanges('');
  }

  ngOnDestroy(): void {
    if (this.allCompetitorsSubscription) { this.allCompetitorsSubscription.unsubscribe() };
    if (this.searchTextSubscription) { this.searchTextSubscription.unsubscribe() };
    if (this.searchCompetitorsSubscription) { this.searchCompetitorsSubscription.unsubscribe() };
  }

  displayMoreCompetitors(quantity: number) {
    const itemsToMove = this.notDisplayedCompetitors.slice(0, quantity);
    this.notDisplayedCompetitors.splice(0, quantity);
    this.displayedCompetitors.push(...itemsToMove);
    this.allCompetitorsDisplayed = (this.notDisplayedCompetitors.length == 0);
  }

  subscribeCompetitorChanges(searchText: string) {
    if (this.searchCompetitorsSubscription) { this.searchCompetitorsSubscription.unsubscribe(); }
    this.searchCompetitorsSubscription = this.dataService.searchAllCompetitors(searchText).subscribe(results => {
      let displayCount = this.displayedCompetitors.length;
      if (displayCount === 0) {displayCount = 100};
      this.displayedCompetitors = [];
      this.notDisplayedCompetitors = results;
      this.allCompetitorsDisplayed = false;
      this.displayMoreCompetitors(displayCount);
    });
  }


  subscribeSearchTextChanges() {
    this.searchTextSubscription = this.searchTextSubject.pipe(debounceTime(500)).subscribe((searchText) => {
      this.subscribeCompetitorChanges(searchText);
    })
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
          this.dataService.deleteCompetitor(competitorId).subscribe(
            result => { this.toasterService.showToast('Competitor Deleted', ToastMessageType.Success, 2000) },
            error => { this.toasterService.showToast('An error occurred while deleting competitor', ToastMessageType.Failure, 0) }
          );
        }
      },
      error => { this.toasterService.showToast('An error occurred while fetching competitor details', ToastMessageType.Failure, 0) }
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


  public onCompetitorDrop(event: any, context: string) {
    this.mergeSource = this.displayedCompetitors.find(competitor => competitor.id === event.item.data);
    this.mergeTarget = this.displayedCompetitors.find(comptetitor => comptetitor.id == event.event.target.parentElement.id);
    this.displayMergeDialog = true;
  }

  public onMergeClick() {
    if (this.mergeSource && this.mergeTarget) {
      this.dataService.mergeCompetitors(this.mergeTarget.id, this.mergeSource.id).subscribe(
        result => this.toasterService.showToast('Competitors merged', ToastMessageType.Success, 1000),
        error => this.toasterService.showToast('Failed to merge competitors', ToastMessageType.Failure, 0)
      )
    }

    this.mergeSource = undefined;
    this.mergeTarget = undefined;
    this.displayMergeDialog = false;
  }

  public onCancelMergeClick() {
    this.mergeSource = undefined;
    this.mergeTarget = undefined;
    this.displayMergeDialog = false;
  }
}
