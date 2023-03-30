import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OeventResultsComponent } from './oevent-results.component';

describe('OeventResultsComponent', () => {
  let component: OeventResultsComponent;
  let fixture: ComponentFixture<OeventResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OeventResultsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OeventResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
