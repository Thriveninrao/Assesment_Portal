import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeUserAssessmentQuestionsComponent } from './take-user-assessment-questions.component';

describe('TakeUserAssessmentQuestionsComponent', () => {
  let component: TakeUserAssessmentQuestionsComponent;
  let fixture: ComponentFixture<TakeUserAssessmentQuestionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TakeUserAssessmentQuestionsComponent]
    });
    fixture = TestBed.createComponent(TakeUserAssessmentQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
