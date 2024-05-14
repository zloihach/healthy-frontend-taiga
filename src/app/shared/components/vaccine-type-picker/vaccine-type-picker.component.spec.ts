import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccineTypePickerComponent } from './vaccine-type-picker.component';

describe('VaccineTypePickerComponent', () => {
  let component: VaccineTypePickerComponent;
  let fixture: ComponentFixture<VaccineTypePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VaccineTypePickerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VaccineTypePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
