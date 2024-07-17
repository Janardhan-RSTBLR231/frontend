import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckRecordCustomRenderComponent } from './check-record-custom-render.component';

describe('CheckRecordCustomRenderComponent', () => {
  let component: CheckRecordCustomRenderComponent;
  let fixture: ComponentFixture<CheckRecordCustomRenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckRecordCustomRenderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckRecordCustomRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
