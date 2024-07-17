import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewCheckPointComponent } from './add-new-check-point.component';

describe('AddNewCheckPointComponent', () => {
  let component: AddNewCheckPointComponent;
  let fixture: ComponentFixture<AddNewCheckPointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddNewCheckPointComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddNewCheckPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
