import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupAssessmentsComponent } from './group-assessments.component';

describe('GroupAssessmentsComponent', () => {
  let component: GroupAssessmentsComponent;
  let fixture: ComponentFixture<GroupAssessmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupAssessmentsComponent]
    });
    fixture = TestBed.createComponent(GroupAssessmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
