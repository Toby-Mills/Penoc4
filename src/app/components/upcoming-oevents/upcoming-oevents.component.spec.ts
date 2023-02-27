import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingOeventsComponent } from './upcoming-oevents.component';

describe('UpcomingOeventsComponent', () => {
  let component: UpcomingOeventsComponent;
  let fixture: ComponentFixture<UpcomingOeventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpcomingOeventsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpcomingOeventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
