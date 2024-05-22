import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildCardComponent } from './child-card.component';

describe('ChildCardComponent', () => {
  let component: ChildCardComponent;
  let fixture: ComponentFixture<ChildCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChildCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChildCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
