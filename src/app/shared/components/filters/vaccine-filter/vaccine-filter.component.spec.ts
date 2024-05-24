import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccineFilterComponent } from './vaccine-filter.component';

describe('VaccineFilterComponent', () => {
  let component: VaccineFilterComponent;
  let fixture: ComponentFixture<VaccineFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VaccineFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VaccineFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
