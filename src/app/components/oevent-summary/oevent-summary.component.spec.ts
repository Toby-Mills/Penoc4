import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OEventSummaryComponent } from './oevent-summary.component';

describe('OEventSummaryComponent', () => {
  let component: OEventSummaryComponent;
  let fixture: ComponentFixture<OEventSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OEventSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OEventSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
