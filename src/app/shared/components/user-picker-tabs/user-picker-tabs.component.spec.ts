import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPickerTabsComponent } from './user-picker-tabs.component';

describe('ChildTabsComponent', () => {
  let component: UserPickerTabsComponent;
  let fixture: ComponentFixture<UserPickerTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPickerTabsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPickerTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
