import { ComponentFixture, TestBed } from '@angular/core/testing';

import IndividualResultsComponent from './individual-results.component';

describe('IndividualResultsComponent', () => {
  let component: IndividualResultsComponent;
  let fixture: ComponentFixture<IndividualResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualResultsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndividualResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
