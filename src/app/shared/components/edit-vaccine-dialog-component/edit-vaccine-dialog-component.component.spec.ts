import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVaccineDialogComponentComponent } from './edit-vaccine-dialog.component';

describe('EditVaccineDialogComponentComponent', () => {
  let component: EditVaccineDialogComponentComponent;
  let fixture: ComponentFixture<EditVaccineDialogComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditVaccineDialogComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditVaccineDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
