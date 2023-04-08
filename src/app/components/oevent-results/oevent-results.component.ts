import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { OEventResults } from 'src/app/models/oevent-results';

@Component({
  selector: 'app-oevent-results',
  templateUrl: './oevent-results.component.html',
  styleUrls: ['./oevent-results.component.css']
})
export class OeventResultsComponent implements OnInit {
  @Input() public oEventResults: OEventResults = new OEventResults;
  public selectedCourse: number = 0;
  constructor() { }

  ngOnInit(): void {
    console.log(this.oEventResults.oEvent);
    if (this.oEventResults.oEvent != undefined && this.oEventResults.courseResults.length > 0) {
      if (this.selectedCourse = 0) {

      }
    }
  }
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
}