import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCheckPointComponent } from './edit-check-point.component';

describe('EditCheckPointComponent', () => {
  let component: EditCheckPointComponent;
  let fixture: ComponentFixture<EditCheckPointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditCheckPointComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EditCheckPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
