import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAssessmentGroupsComponent } from './view-assessment-groups.component';

describe('ViewAssessmentGroupsComponent', () => {
  let component: ViewAssessmentGroupsComponent;
  let fixture: ComponentFixture<ViewAssessmentGroupsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewAssessmentGroupsComponent]
    });
    fixture = TestBed.createComponent(ViewAssessmentGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
