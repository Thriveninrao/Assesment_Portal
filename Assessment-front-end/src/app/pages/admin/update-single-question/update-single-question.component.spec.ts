import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSingleQuestionComponent } from './update-single-question.component';

describe('UpdateSingleQuestionComponent', () => {
  let component: UpdateSingleQuestionComponent;
  let fixture: ComponentFixture<UpdateSingleQuestionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateSingleQuestionComponent]
    });
    fixture = TestBed.createComponent(UpdateSingleQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
