import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckSheetDetailsComponent } from './check-sheet-details.component';

describe('CheckSheetDetailsComponent', () => {
  let component: CheckSheetDetailsComponent;
  let fixture: ComponentFixture<CheckSheetDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckSheetDetailsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CheckSheetDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
