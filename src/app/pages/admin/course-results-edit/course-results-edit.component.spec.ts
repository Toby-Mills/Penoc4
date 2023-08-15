import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseResultsEditComponent } from './course-results-edit.component';

describe('CourseResultsEditComponent', () => {
  let component: CourseResultsEditComponent;
  let fixture: ComponentFixture<CourseResultsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseResultsEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseResultsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
