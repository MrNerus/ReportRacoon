import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderCanvasComponent } from './render-canvas.component';

describe('RenderCanvasComponent', () => {
  let component: RenderCanvasComponent;
  let fixture: ComponentFixture<RenderCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RenderCanvasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RenderCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
