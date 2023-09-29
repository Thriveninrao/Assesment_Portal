import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartTestComponent } from './start-test.component';

describe('StartTestComponent', () => {
  let component: StartTestComponent;
  let fixture: ComponentFixture<StartTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StartTestComponent]
    });
    fixture = TestBed.createComponent(StartTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
