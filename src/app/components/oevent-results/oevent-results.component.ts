import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { OEventResults } from 'src/app/models/oevent-results';

@Component({
  selector: 'app-oevent-results',
  templateUrl: './oevent-results.component.html',
  styleUrls: ['./oevent-results.component.css']
})
export class OeventResultsComponent implements OnInit {
  @Input() public oEventResults: OEventResults = new OEventResults;
  public selectedCourse: number = 0;
  constructor(private router: Router) { }

  ngOnInit(): void {}

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
    this.router.navigate(['results']);
  }
}