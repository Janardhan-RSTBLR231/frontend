import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomRowColourComponent } from './custom-row-colour.component';

describe('CustomRowColourComponent', () => {
  let component: CustomRowColourComponent;
  let fixture: ComponentFixture<CustomRowColourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomRowColourComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomRowColourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
