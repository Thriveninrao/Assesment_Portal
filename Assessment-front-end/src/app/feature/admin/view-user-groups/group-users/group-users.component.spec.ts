import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupUsersComponent } from './group-users.component';

describe('GroupUsersComponent', () => {
  let component: GroupUsersComponent;
  let fixture: ComponentFixture<GroupUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupUsersComponent]
    });
    fixture = TestBed.createComponent(GroupUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
