import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewCheckSheetComponent } from './add-new-check-sheet.component';

describe('AddNewCheckSheetComponent', () => {
  let component: AddNewCheckSheetComponent;
  let fixture: ComponentFixture<AddNewCheckSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddNewCheckSheetComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddNewCheckSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
