import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVaccineDialogComponent } from './edit-vaccine-dialog.component';

describe('EditVaccineDialogComponent', () => {
  let component: EditVaccineDialogComponent;
  let fixture: ComponentFixture<EditVaccineDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditVaccineDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditVaccineDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
