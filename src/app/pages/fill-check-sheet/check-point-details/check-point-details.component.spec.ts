import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckPointDetailsComponent } from './check-point-details.component';

describe('CheckPointDetailsComponent', () => {
  let component: CheckPointDetailsComponent;
  let fixture: ComponentFixture<CheckPointDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckPointDetailsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CheckPointDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
