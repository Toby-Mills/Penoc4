import { Component, OnInit, Input, HostListener, Host, Output, EventEmitter } from '@angular/core';
import { CourseResults } from 'src/app/models/course-results';

@Component({
  selector: 'app-course-results',
  templateUrl: './course-results.component.html',
  styleUrls: ['./course-results.component.css']
})
export class CourseResultsComponent implements OnInit {
  @Input() courseResults: CourseResults = new CourseResults;
  @Output() competitorClicked: EventEmitter<number> = new EventEmitter();

  public narrowScreen: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.checkScreenWidth();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenWidth();
  }

  public hasDisqualifiedCompetitors(): boolean {
    if (this.courseResults) {
      return this.courseResults.results.some(d => d.disqualified);
    }
    return false;
  }

  public onCompetitorClick(competitorId: number) {
    this.competitorClicked.emit(competitorId);
  }

  private checkScreenWidth() {
    this.narrowScreen = (window.innerWidth < 800 ? true : false);
  }
}
