import { Component, ElementRef, QueryList, Renderer2, ViewChild, ViewChildren, Input, Output, EventEmitter } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Dialog, DialogRef } from '@angular/cdk/dialog'
import { Competitor } from 'src/app/models/competitor';
import { PenocApiService } from 'src/app/services/penoc-api.service';
import { AddCompetitorComponent } from '../add-competitor/add-competitor.component';

@Component({
  selector: 'app-competitor-selector',
  templateUrl: './competitor-selector.component.html',
  styleUrls: ['./competitor-selector.component.css']
})
export class CompetitorSelectorComponent {
  @Input() competitorId: number | undefined = 0;
  @Input() individualsOnly: boolean = false;
  @Output() competitorIdChange: EventEmitter<number | undefined> = new EventEmitter();

  public competitorName: string = '';
  public searchVisible: boolean = false;
  public inputText: string = "";
  public searching: boolean = false;
  public matches: Competitor[] = [];
  public selectedMatchId: number | undefined = 0;
  public highlightedMatchId: number | undefined;
  public hasFocus: boolean = false;

  private searchSubject = new Subject<string>();
  @ViewChildren('searchInputBox')
  public searchInputBoxes!: QueryList<ElementRef>
  public searchInputBox!: HTMLElement;

  constructor(
    private api: PenocApiService,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private dialog: Dialog,
  ) { }

  ngOnInit(): void {
    if (this.competitorId) {
      this.selectCompetitor(this.competitorId);
    }
    this.searchSubject.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((inputText) => {
        if (this.individualsOnly) { return this.api.searchIndividuals(inputText) }
        else { return this.api.searchCompetitors(inputText) }
      })
    ).subscribe(
      {
        'next': (value) => {
          this.searching = false;
          this.matches = value;
          if (this.matches.findIndex((value) => value.id == this.highlightedMatchId) == -1) {
            this.highlightedMatchId = undefined;
          }
          this.selectedMatchId = 0;
        },
        'error': (error) => { console.log('error: ', error) }
      }
    )
  }

  ngAfterViewInit() {
    this.searchInputBoxes.changes.subscribe((elements: QueryList<ElementRef>) => {
      const elementReference: ElementRef = elements.first;
      if (elementReference) {
        this.searchInputBox = elementReference.nativeElement;
        this.searchInputBox.focus();
      }
    })
  }

  displaySearch() {
    this.searchVisible = true;
    if (this.competitorId) {
      this.selectedMatchId = this.competitorId;
      this.highlightedMatchId = this.competitorId;
    }
  }

  hideSearch() {
    this.searchVisible = false;
  }

  onSearchInput(): void {
    if (this.inputText.length > 2) {
      this.searching = true;
      this.searchSubject.next(this.inputText);
    } else {
      this.matches = [];
    }
  }

  onMatchClicked($event: Event): void {
    if ($event.target) {
      const target: HTMLElement = $event.target as HTMLElement;
      this.selectCompetitor(Number(target.id));
    }
  }

  selectCompetitor(competitorId: number | undefined) {
    this.loadCompetitor(competitorId);
    this.hideSearch();
    this.competitorIdChange.next(competitorId);
  }

  loadCompetitor(competitorId: number | undefined) {


    if (competitorId) {
      this.competitorId = competitorId;
      this.selectedMatchId = competitorId;
      this.highlightedMatchId = competitorId;
      let selectedCompetitor: Competitor | undefined = this.matches.find((value) => {
        return value.id == competitorId;
      })
      if (selectedCompetitor) { this.competitorName = selectedCompetitor.fullName; }
      else {
        this.api.getCompetitor(competitorId).subscribe({
          'next': (data) => { this.matches.push(data); this.loadCompetitor(competitorId); },
          'error': (error) => { console.log('error', error) }
        })
      }
    } else {
      this.competitorId = undefined;
      this.selectedMatchId = undefined;
      this.highlightedMatchId = undefined;
      this.competitorName = '';
    }
  }

  clearCompetitor() {
    this.competitorId = 0;
    this.competitorName = '';
    this.selectedMatchId = 0;
    this.highlightedMatchId = 0;
    this.hideSearch();
  }

  onSearchInputKeydown($event: KeyboardEvent) {
    switch ($event.code) {
      case 'Escape':
        this.hideSearch();
        //this.tabToControl(true);
        break;
      case 'Tab':
        if (!$event.shiftKey) {
          if (this.searchVisible && !this.searching) {
            $event.preventDefault();
            this.selectHighlightedMatch();
            this.hideSearch();
            this.focusOnClear();
          }
        }
        break;
      case 'ArrowDown':
        this.highlightNextMatch();
        break;
      case 'ArrowUp':
        this.highlightPreviousMatch();
        break;
      case 'Enter':
        if (!this.searching) {
          $event.preventDefault();
          this.selectHighlightedMatch()
          this.hideSearch();
          this.focusOnClear();
        }
    };
  }

  onSearchBlur() {
    //use a Timeout to allow the onMatchClicked event to be handled first if needed
    setTimeout(() => {
      this.hideSearch();
    }, 500);

  }

  highlightNextMatch() {
    if (this.matches.length > 0) {
      let highlightedMatchIndex: number = this.matches.findIndex((value) => {
        return value.id == this.highlightedMatchId;
      })
      if (highlightedMatchIndex >= 0) {
        highlightedMatchIndex = highlightedMatchIndex + 1;
      } else {
        highlightedMatchIndex = 0;
      }
      if (highlightedMatchIndex >= this.matches.length) {
        highlightedMatchIndex = 0;
      }
      this.highlightedMatchId = this.matches[highlightedMatchIndex].id;
    }
  }

  highlightPreviousMatch() {
    if (this.matches.length > 0) {
      let highlightedMatchIndex: number = this.matches.findIndex((value) => {
        return value.id == this.highlightedMatchId;
      })

      if (highlightedMatchIndex >= 0) {
        highlightedMatchIndex = highlightedMatchIndex - 1;
      } else {
        highlightedMatchIndex = 0;
      }

      if (highlightedMatchIndex == -1) {
        highlightedMatchIndex = this.matches.length - 1;
      }

      this.highlightedMatchId = this.matches[highlightedMatchIndex].id;
    }
  }

  selectHighlightedMatch() {
    if (!this.highlightedMatchId) {
      if (this.matches.length > 0) {
        this.highlightNextMatch();
      }
    }
    if (this.highlightedMatchId) {
      this.selectCompetitor(this.highlightedMatchId);
    }
  }

  tabToControl(next: boolean) {
    const element = this.elementRef.nativeElement;
    let nextElement = element.nextElementSibling;

    if (!next) {
      nextElement = element.previousElementSibling;
    }
    if (nextElement) {
      this.renderer.selectRootElement(nextElement).focus();
    }
  }

  onAddClick() {
    const dialogRef = this.dialog.open(AddCompetitorComponent, {
      height: '400px',
      width: '600px'
    })
    dialogRef.componentInstance?.newCompetitor.subscribe((competitor) => {
      this.clearCompetitor();
      this.selectCompetitor(competitor.id);
      this.focusOnClear();
    });
    dialogRef.componentInstance?.cancel.subscribe(() => {
      this.focusOnInput();
    })
  }

  focusOnClear() {
    const elementToFocus = this.elementRef.nativeElement.querySelector('#clear');
    if (elementToFocus) {
      this.renderer.selectRootElement(elementToFocus).focus();
    }
  }

  focusOnInput() {
    const elementToFocus = this.elementRef.nativeElement.querySelector('#competitorName');
    if (elementToFocus) {
      this.renderer.selectRootElement(elementToFocus).focus();
    }
  }
}
