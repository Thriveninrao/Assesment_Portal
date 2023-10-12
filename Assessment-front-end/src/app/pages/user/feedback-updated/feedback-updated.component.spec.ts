import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackUpdatedComponent } from './feedback-updated.component';

describe('FeedbackUpdatedComponent', () => {
  let component: FeedbackUpdatedComponent;
  let fixture: ComponentFixture<FeedbackUpdatedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeedbackUpdatedComponent]
    });
    fixture = TestBed.createComponent(FeedbackUpdatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
