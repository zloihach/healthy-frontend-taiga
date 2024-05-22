import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccineDialogComponentComponent } from './vaccine-dialog.component.component';

describe('VaccineDialogComponentComponent', () => {
  let component: VaccineDialogComponentComponent;
  let fixture: ComponentFixture<VaccineDialogComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VaccineDialogComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VaccineDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
