import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCompetitorComponent } from './add-edit-competitor.component';

describe('AddEditCompetitorComponent', () => {
  let component: AddEditCompetitorComponent;
  let fixture: ComponentFixture<AddEditCompetitorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditCompetitorComponent]
    });
    fixture = TestBed.createComponent(AddEditCompetitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
