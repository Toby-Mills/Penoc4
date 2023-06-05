import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitorSelectorComponent } from './competitor-selector.component';

describe('CompetitorSelectorComponent', () => {
  let component: CompetitorSelectorComponent;
  let fixture: ComponentFixture<CompetitorSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetitorSelectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompetitorSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
