import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { OEventResults } from 'src/app/models/oevent-results';
import { Location } from '@angular/common';

@Component({
  selector: 'app-oevent-results',
  templateUrl: './oevent-results.component.html',
  styleUrls: ['./oevent-results.component.css']
})
export class OeventResultsComponent implements OnInit {
  @Input() public oEventResults: OEventResults = new OEventResults;
  @Output() public competitorClicked: EventEmitter<number> = new EventEmitter();

  public selectedCourse: number = 0;
  constructor(
    private location: Location,
  ) { }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['oEventResults'] != undefined) {
      if (this.oEventResults.courseResults.length > 0) {
        this.selectedCourse = this.oEventResults.courseResults[0].course.id;
      }
    }
  }

  public onCourseTabClick(courseId: number) {
    this.selectedCourse = courseId;
  }

  public onCloseClick() {
    this.location.back();
  }

  onCompetitorClick(competitorId: number) {
    this.competitorClicked.emit(competitorId);
  }
}