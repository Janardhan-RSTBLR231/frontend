import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailogAddNewComponent } from './dailog-add-new.component';

describe('DailogAddNewComponent', () => {
  let component: DailogAddNewComponent;
  let fixture: ComponentFixture<DailogAddNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailogAddNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailogAddNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
