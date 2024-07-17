import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonnImageDialogComponent } from './commonn-image-dialog.component';

describe('CommonnImageDialogComponent', () => {
  let component: CommonnImageDialogComponent;
  let fixture: ComponentFixture<CommonnImageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonnImageDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonnImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
