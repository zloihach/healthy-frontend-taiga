import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChildDialogComponent } from './add-child-dialog.component';

describe('AddChildDialogComponent', () => {
  let component: AddChildDialogComponent;
  let fixture: ComponentFixture<AddChildDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddChildDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddChildDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
