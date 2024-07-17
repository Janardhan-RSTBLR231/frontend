import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailogUpdateComponent } from './dailog-update.component';

describe('DailogUpdateComponent', () => {
  let component: DailogUpdateComponent;
  let fixture: ComponentFixture<DailogUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailogUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailogUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
