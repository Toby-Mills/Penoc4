import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatIsOrienteeringComponent } from './what-is-orienteering.component';

describe('WhatIsOrienteeringComponent', () => {
  let component: WhatIsOrienteeringComponent;
  let fixture: ComponentFixture<WhatIsOrienteeringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhatIsOrienteeringComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhatIsOrienteeringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
