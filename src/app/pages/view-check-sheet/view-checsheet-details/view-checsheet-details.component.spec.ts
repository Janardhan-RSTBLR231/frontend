import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewChecsheetDetailsComponent } from './view-checsheet-details.component';

describe('ViewChecsheetDetailsComponent', () => {
  let component: ViewChecsheetDetailsComponent;
  let fixture: ComponentFixture<ViewChecsheetDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewChecsheetDetailsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ViewChecsheetDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
