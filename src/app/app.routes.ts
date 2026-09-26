import { Routes } from '@angular/router';
import { RenderCanvasComponent } from './component/render-canvas/render-canvas.component';
import { GlassShowcaseComponent } from './page/glass-showcase/glass-showcase.component';

export const routes: Routes = [
  { path: '', component: RenderCanvasComponent },
  { path: 'glass', component: GlassShowcaseComponent },
  { path: '**', redirectTo: '' }
];
