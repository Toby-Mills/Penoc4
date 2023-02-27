import { Component, OnInit, Input } from '@angular/core';
import { CourseResults } from 'src/app/models/course-results';

@Component({
  selector: 'app-course-results',
  templateUrl: './course-results.component.html',
  styleUrls: ['./course-results.component.css']
})
export class CourseResultsComponent implements OnInit {
@Input() courseResults:CourseResults = new CourseResults;

  constructor() { }

  ngOnInit(): void {
  }

}
