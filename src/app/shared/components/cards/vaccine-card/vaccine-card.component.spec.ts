import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccineCardComponent } from './vaccine-card.component';

describe('VaccineCardComponent', () => {
  let component: VaccineCardComponent;
  let fixture: ComponentFixture<VaccineCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VaccineCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VaccineCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
