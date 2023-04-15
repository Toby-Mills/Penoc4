import { Component, OnInit, Input, HostListener, Host } from '@angular/core';
import { CourseResults } from 'src/app/models/course-results';

@Component({
  selector: 'app-course-results',
  templateUrl: './course-results.component.html',
  styleUrls: ['./course-results.component.css']
})
export class CourseResultsComponent implements OnInit {
  @Input() courseResults: CourseResults = new CourseResults;
  public narrowScreen: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.checkScreenWidth();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any){
    this.checkScreenWidth();
  }

  public hasDisqualifiedCompetitors(): boolean {
    if (this.courseResults) {
      return this.courseResults.results.some(d => d.disqualified);
    }
    return false;
  }

  private checkScreenWidth(){
    this.narrowScreen = (window.innerWidth < 800 ? true: false);
  }
}
