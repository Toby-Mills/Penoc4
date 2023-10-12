import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Club } from 'src/app/models/club';
import { Result } from 'src/app/models/result';
import { DataCacheService } from 'src/app/services/data-cache.service';
import { PenocApiService } from 'src/app/services/penoc-api.service';

@Component({
  selector: 'app-course-results-edit',
  templateUrl: './course-results-edit.component.html',
  styleUrls: ['./course-results-edit.component.css']
})
export class CourseResultsEditComponent {
  public courseId: number = 0;
  public results: Result[] = [];
  public clubs: Club[] = [];
  public editResult: number | undefined;

  constructor(
    public route: ActivatedRoute,
    public api: PenocApiService,
    public dataCache: DataCacheService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadCourseResults(Number(this.route.snapshot.paramMap.get('courseId')));
    this.dataCache.getClubs().subscribe(data => this.clubs = data);
  }

  private loadCourseResults(courseId: number) {
    this.courseId = courseId;
    this.api.getCourseResults(courseId).subscribe(data => { this.results = data });
  }

  public updateResultTime(competitorId: number, $event: any) {
    const element = $event.currentTarget as HTMLInputElement;
    const timeString = element.value;
    const time: Date | undefined = this.parseTimeString(timeString);
    if (time) {
      let resultIndex = this.results.findIndex((item) => item.competitorId == competitorId)
      if (resultIndex > -1) {
        let result = this.results[resultIndex];
        result.time = time;
        this.results[resultIndex] = result;
      }
    }
  }

  public onNewClick() {
    let newResult = new Result();
    newResult.time = new Date('1970-01-01T00:00:00Z');
    this.results.push(newResult);
  }

  private parseTimeString(input: string): Date | undefined {

    const noColons: string = input.replace(/:/g, '');
    if (/^[0-9]{1,6}$/.test(noColons)) {
      const paddedString = noColons.padStart(6, '0');
      const formattedString = paddedString.replace(/(\d{2})(?=\d)/g, '$1:');
      const newDate = new Date(`1970-01-01T${formattedString}`)
      return newDate;
    } else {
      return undefined;
    }
  }

  public onSaveClick() {
    this.api.saveCourseResults(this.courseId, this.results).subscribe(data => console.log(data));
  }

}
