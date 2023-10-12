import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreinstructionsComponent } from './preinstructions.component';

describe('PreinstructionsComponent', () => {
  let component: PreinstructionsComponent;
  let fixture: ComponentFixture<PreinstructionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreinstructionsComponent]
    });
    fixture = TestBed.createComponent(PreinstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
