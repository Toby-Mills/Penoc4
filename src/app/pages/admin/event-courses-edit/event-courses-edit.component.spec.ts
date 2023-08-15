import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCoursesEditComponent } from './event-courses-edit.component';

describe('EventCoursesEditComponent', () => {
  let component: EventCoursesEditComponent;
  let fixture: ComponentFixture<EventCoursesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventCoursesEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventCoursesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
