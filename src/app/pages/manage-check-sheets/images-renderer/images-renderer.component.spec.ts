import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesRendererComponent } from './images-renderer.component';

describe('ImagesRendererComponent', () => {
  let component: ImagesRendererComponent;
  let fixture: ComponentFixture<ImagesRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagesRendererComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImagesRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
