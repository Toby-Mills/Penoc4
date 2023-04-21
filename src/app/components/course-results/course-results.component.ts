import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CourseResults } from 'src/app/models/course-results';
import { ScreenWidthCategories, ScreenWidthService } from 'src/app/services/screen-width.service';

@Component({
  selector: 'app-course-results',
  templateUrl: './course-results.component.html',
  styleUrls: ['./course-results.component.css']
})
export class CourseResultsComponent implements OnInit {
  @Input() courseResults: CourseResults = new CourseResults;
  @Output() competitorClicked: EventEmitter<number> = new EventEmitter();

  public narrowScreen: boolean = false;

  constructor(private screenWidthService: ScreenWidthService) { }

  ngOnInit(): void {
    this.narrowScreen = this.screenWidthService.narrowerThan(ScreenWidthCategories.Mobile);
    this.screenWidthService.narrowerThan$(ScreenWidthCategories.Mobile)
      .subscribe(data => this.narrowScreen = data);
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
  
}
