import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAssessmentDetailsComponent } from './user-assessment-details.component';

describe('UserAssessmentDetailsComponent', () => {
  let component: UserAssessmentDetailsComponent;
  let fixture: ComponentFixture<UserAssessmentDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserAssessmentDetailsComponent]
    });
    fixture = TestBed.createComponent(UserAssessmentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
