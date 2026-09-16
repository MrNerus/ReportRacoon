import { Component } from '@angular/core';
import { RenderCanvasComponent } from './component/render-canvas/render-canvas.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RenderCanvasComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ReportRaccoon';
}
