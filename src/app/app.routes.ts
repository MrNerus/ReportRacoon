import { Routes } from '@angular/router';
import { RenderCanvasComponent } from './component/render-canvas/render-canvas.component';

export const routes: Routes = [
  { path: '', component: RenderCanvasComponent },
  { path: '**', redirectTo: '' }
];
