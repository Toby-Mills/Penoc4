import { ChangeDetectorRef, Component, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute, } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Club } from 'src/app/models/club';
import { CourseResults } from 'src/app/models/course-results';
import { Result } from 'src/app/models/result';
import { DataCacheService } from 'src/app/services/data-cache.service';
import { PenocApiService } from 'src/app/services/penoc-api.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { ToastMessageType } from 'src/app/components/toaster/toaster.component';

@Component({
  selector: 'app-course-results-edit',
  templateUrl: './course-results-edit.component.html',
  styleUrls: ['./course-results-edit.component.css']
})
export class CourseResultsEditComponent {
  public courseId: number = 0;
  public courseResults: CourseResults | undefined;
  public clubs: Club[] = [];
  public editResult: number | undefined;
  public saving: boolean = false;

  constructor(
    public route: ActivatedRoute,
    public api: PenocApiService,
    public dataCache: DataCacheService,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private toasterService: ToasterService,
  ) { }

  ngOnInit() {
    this.loadCourseResults(Number(this.route.snapshot.paramMap.get('courseId')));
    this.dataCache.getClubs().subscribe(data => { data.sort((a, b) => a.shortName!.localeCompare(b.shortName!)); this.clubs = data });
  }

  private loadCourseResults(courseId: number) {
    this.courseId = courseId;
    this.api.getCourseResults(courseId).subscribe(data => {
      this.courseResults = data
    });
  }

  public onNewClick() {
    if (this.courseResults) {
      let newResult = new Result();
      newResult.position = this.courseResults.results.length + 1;
      newResult.time = new Date('1970-01-01T00:00:00Z');
      this.courseResults.results.push(newResult);
      this.focusOnLastCompetitor();
    }
  }

  focusOnLastCompetitor() {
    setTimeout(
      () => {
        const rows = this.elementRef.nativeElement.querySelectorAll('tr');
        const lastRow = rows[rows.length - 1];
        if (lastRow) {
          const input = lastRow.querySelector('input');
          if (input) {
            this.renderer.selectRootElement(input).focus();
          }
        }
      }
    )
  }

  public onSaveClick() {
    this.saving = true;
    this.api.saveCourseResults(this.courseId, this.courseResults!.results).subscribe(
      (data) => { this.saving = false; this.toasterService.showToast('successfully saved', ToastMessageType.Success, 3000) },
      (error) => { this.saving = false; this.toasterService.showToast(error.message, ToastMessageType.Failure, 0) }
    );
  }

  public onTimeChange(index: number, event: any) {
    let result = this.courseResults!.results[index];
    result.time = event;
    this.courseResults!.results[index] = result;

  }

  onResultDrop(event: CdkDragDrop<Result[]>) {
    let results = this.courseResults!.results;
    moveItemInArray(results, event.previousIndex, event.currentIndex);
    for (let index = 0; index < results.length; index++) {
      results[index].position = index + 1;
    }
    this.courseResults!.results = results;
  }

  onCompetitorIdChange(index: number, competitorId: number | undefined) {
    if (competitorId) {
      this.api.getCompetitor(competitorId).subscribe((competitor) => {
        this.courseResults!.results[index].competitor = competitor.fullName;
      })
    } else {
      this.courseResults!.results[index].competitor = '';
    }
  }

  onDeleteClick(index: number) {
    this.courseResults!.results.splice(index, 1);
  }

}
