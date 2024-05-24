import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoChildDialogComponent } from './info-child-dialog.component';

describe('InfoChildDialogComponent', () => {
  let component: InfoChildDialogComponent;
  let fixture: ComponentFixture<InfoChildDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoChildDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoChildDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
