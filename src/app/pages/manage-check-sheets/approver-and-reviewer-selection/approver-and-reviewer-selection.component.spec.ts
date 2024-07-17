import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproverAndReviewerSelectionComponent } from './approver-and-reviewer-selection.component';

describe('ApproverAndReviewerSelectionComponent', () => {
  let component: ApproverAndReviewerSelectionComponent;
  let fixture: ComponentFixture<ApproverAndReviewerSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproverAndReviewerSelectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproverAndReviewerSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
