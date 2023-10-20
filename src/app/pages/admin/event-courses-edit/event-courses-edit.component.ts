import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';
import { Course } from 'src/app/models/course';
import { Difficulty } from 'src/app/models/difficulty';
import { OEvent } from 'src/app/models/oevent.model';
import { DataCacheService } from 'src/app/services/data-cache.service';
import { PenocApiService } from 'src/app/services/penoc-api.service';
@Component({
  selector: 'app-event-courses-edit',
  templateUrl: './event-courses-edit.component.html',
  styleUrls: ['./event-courses-edit.component.css']
})
export class EventCoursesEditComponent {
  //public eventId:number = 0;
  public oEvent: OEvent | undefined = undefined;
  public courses: Course[] = [];
  public editCourse: Course | undefined = undefined;
  public difficulties: Difficulty[] = [];

  constructor(
    public route: ActivatedRoute,
    public api: PenocApiService,
    public dataCache: DataCacheService,
    private router: Router
  ) { }

  ngOnInit() {
    let eventId = Number(this.route.snapshot.paramMap.get('oEventId'))
    this.loadEvent(eventId);
    this.loadEventCourses(eventId);
    this.dataCache.getDifficulties().subscribe(data => this.difficulties = data);
  }

  public loadEvent(eventId: number) {
    this.api.getOEvent(eventId).subscribe(data => { this.oEvent = data });
  }

  public loadEventCourses(eventId: number) {
    this.api.getOEventCourses(eventId).subscribe(data => { this.courses = data });
  }

  onEditClick(courseId: number) {
    let course: Course | undefined = this.courses.find(course => course.id === courseId);
    if (course) {
      this.editCourse = { ...course }
    }
  }

  onSaveClick() {
    if (this.editCourse) {
      if (this.editCourse.id > 0) {
        this.api.saveCourse(this.editCourse).subscribe(data => {
          this.editCourse = undefined;
          this.loadEventCourses(this.oEvent!.id!);
        })
      }
      else {
        this.editCourse.listOrder = this.courses.length + 1;
        this.api.addCourse(this.editCourse).subscribe(data => {
          this.editCourse = undefined;
          this.loadEventCourses(this.oEvent!.id!);
        })
      }
    }
  }

  onCancelClick() {
    this.editCourse = undefined;
  }

  onNewClick() {
    this.editCourse = new Course();
    this.editCourse.eventId = this.oEvent!.id!;
  }

  onDeleteClick(courseId: number) {
    this.api.deleteCourse(courseId).subscribe(data => {
      this.loadEventCourses(this.oEvent!.id!);
    });
  }

  onResultsClick(courseId: number) {
    this.router.navigate(['admin/course-results-edit', courseId]);
  }

  onCourseDrop(event: CdkDragDrop<Course[]>){
    moveItemInArray(this.courses, event.previousIndex, event.currentIndex);
    for (let index = 0; index < this.courses.length; index++){
      this.courses[index].listOrder = index + 1;
      this.api.saveCourse(this.courses[index]).subscribe();
    }
  }
}

