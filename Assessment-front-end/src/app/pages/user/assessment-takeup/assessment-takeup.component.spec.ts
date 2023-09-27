import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentTakeupComponent } from './assessment-takeup.component';

describe('AssessmentTakeupComponent', () => {
  let component: AssessmentTakeupComponent;
  let fixture: ComponentFixture<AssessmentTakeupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssessmentTakeupComponent]
    });
    fixture = TestBed.createComponent(AssessmentTakeupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
