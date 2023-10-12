import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserAssessmentsComponent } from './view-user-assessments.component';

describe('ViewUserAssessmentsComponent', () => {
  let component: ViewUserAssessmentsComponent;
  let fixture: ComponentFixture<ViewUserAssessmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewUserAssessmentsComponent]
    });
    fixture = TestBed.createComponent(ViewUserAssessmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
