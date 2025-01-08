import { Component, input, InputSignal, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-visualizer-settings',
  imports: [FormsModule],
  templateUrl: './visualizer-settings.component.html',
  styleUrl: './visualizer-settings.component.css',
})
export class VisualizerSettingsComponent {
  readonly disabled: InputSignal<boolean> = input<boolean>(false);

  speed = model<number>();
  amount = model<number>();
  soundEnabled = model<boolean>(true)
  timerEnabled = model<boolean>(true);
}
