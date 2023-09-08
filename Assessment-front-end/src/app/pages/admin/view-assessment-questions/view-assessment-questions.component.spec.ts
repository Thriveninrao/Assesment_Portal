import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAssessmentQuestionsComponent } from './view-assessment-questions.component';

describe('ViewAssessmentQuestionsComponent', () => {
  let component: ViewAssessmentQuestionsComponent;
  let fixture: ComponentFixture<ViewAssessmentQuestionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewAssessmentQuestionsComponent]
    });
    fixture = TestBed.createComponent(ViewAssessmentQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
