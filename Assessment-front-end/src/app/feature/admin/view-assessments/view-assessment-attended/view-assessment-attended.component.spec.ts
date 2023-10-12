import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAssessmentAttendedComponent } from './view-assessment-attended.component';

describe('ViewAssessmentAttendedComponent', () => {
  let component: ViewAssessmentAttendedComponent;
  let fixture: ComponentFixture<ViewAssessmentAttendedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewAssessmentAttendedComponent]
    });
    fixture = TestBed.createComponent(ViewAssessmentAttendedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
