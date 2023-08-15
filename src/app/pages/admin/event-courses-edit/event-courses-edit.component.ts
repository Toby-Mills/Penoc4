import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Course } from 'src/app/models/course';
import { Difficulty } from 'src/app/models/difficulty';
import { DataCacheService } from 'src/app/services/data-cache.service';
import { PenocApiService } from 'src/app/services/penoc-api.service';

@Component({
  selector: 'app-event-courses-edit',
  templateUrl: './event-courses-edit.component.html',
  styleUrls: ['./event-courses-edit.component.css']
})
export class EventCoursesEditComponent {
  public eventId:number = 0;
  public courses:Course[] = [];
  public editCourse:Course|undefined = undefined;
  public difficulties:Difficulty[] = [];

  constructor(
    public route:ActivatedRoute,
    public api:PenocApiService,
    public dataCache:DataCacheService,
    private router:Router
  ){}

  ngOnInit(){
    this.loadEventCourses(Number(this.route.snapshot.paramMap.get('oEventId')));
    this.dataCache.getDifficulties().subscribe(data => this.difficulties = data);
  }

  public loadEventCourses(eventId:number){
    this.eventId = eventId;
    this.api.getOEventCourses(eventId).subscribe(data => {this.courses = data});
  }

  onEditClick(courseId:number){
    let course:Course|undefined = this.courses.find(course => course.id === courseId);
    if(course){
      this.editCourse = { ...course }
    }
  }

  onSaveClick(){
    if(this.editCourse){
      if(this.editCourse.id > 0){
        this.api.saveCourse(this.editCourse).subscribe(data =>{
        this.editCourse = undefined; 
        this.loadEventCourses(this.eventId);})}
      else {
        this.api.addCourse(this.editCourse).subscribe(data => {
        this.editCourse = undefined; 
        this.loadEventCourses(this.eventId)})
      }
    }
  }

  onCancelClick(){
    this.editCourse = undefined;
  }

  onNewClick(){
    this.editCourse = new Course();
    this.editCourse.eventId = this.eventId;
  }

  onDeleteClick(courseId:number){  
    this.api.deleteCourse(courseId).subscribe(data => {
      this.loadEventCourses(this.eventId);
    });
  }

  onNameClick(courseId:number){
    this.router.navigate(['course-results-edit', courseId]);
  }
}

