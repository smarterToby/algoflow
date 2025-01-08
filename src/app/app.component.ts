import {Component} from '@angular/core';
import {MaxWWrapperComponent} from './components/core/max-w-wrapper/max-w-wrapper.component';
import {ESortingAlgorithm} from './enums/enums';
import { AlgorithmInfoComponent } from "./components/algorithm-info/algorithm-info.component";
import { algorithms } from './constants/constants';
import { IAlgorithm } from './types/types';
import { VisualizerComponent } from "./components/visualizer/visualizer.component";
import { VisualizerSettingsComponent } from "./components/visualizer-settings/visualizer-settings.component";

@Component({
  selector: 'app-root',
  imports: [
    MaxWWrapperComponent,
    AlgorithmInfoComponent,
    VisualizerComponent,
    VisualizerSettingsComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  readonly anio: number = new Date().getFullYear();
  public selectedAlgorithm: ESortingAlgorithm = ESortingAlgorithm.BUBBLE_SORT;
  readonly availableAlgorithms: IAlgorithm[] = algorithms;

  public visualizerSpeed = 100;
  public visualizerAmount = 100;
  public soundEnabled = true;
  public timerEnabled = true;
  isRunning = false;

  onAlgorithmChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.selectedAlgorithm = select.value as ESortingAlgorithm;
  }

  onRunningChange(running: boolean) {
    this.isRunning = running;
  }
}
