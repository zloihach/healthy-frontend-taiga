import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPickerTabs } from './user-picker-tabs';

describe('ChildTabsComponent', () => {
  let component: UserPickerTabs;
  let fixture: ComponentFixture<UserPickerTabs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPickerTabs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPickerTabs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
