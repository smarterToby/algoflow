import {
  Component,
  input,
  InputSignal,
  Output,
  EventEmitter,
  effect,
  OnInit,
} from '@angular/core';
import { ESortingAlgorithm } from '../../enums/enums';
import { CommonModule } from '@angular/common';
import { SortingService } from '../../services/sorting.service';

@Component({
  selector: 'app-visualizer',
  imports: [CommonModule],
  templateUrl: './visualizer.component.html',
  styleUrl: './visualizer.component.css',
})
export class VisualizerComponent implements OnInit {
  private audioContext: AudioContext | null = null;
  readonly algorithm: InputSignal<ESortingAlgorithm> = input<ESortingAlgorithm>(
    ESortingAlgorithm.BUBBLE_SORT
  );
  readonly speed: InputSignal<number> = input<number>(50);
  readonly amount: InputSignal<number> = input<number>(100);
  readonly soundEnabled: InputSignal<boolean> = input<boolean>(true);
  readonly timerEnabled: InputSignal<boolean> = input<boolean>(true);
  running: boolean = false;

  elapsedTime: number = 0;
  timerInterval: any;

  @Output() isRunningChange = new EventEmitter<boolean>();

  bars: number[] = [];
  comparing: [number, number] | null = null;
  swapping: [number, number] | null = null;
  sorted: number[] = [];

  private stopSorting = false;

  constructor(private sortingService: SortingService) {
    effect(() => {
      if (!this.running) {
        this.generateBars();
      }
    });
  }

  ngOnInit() {
    this.generateBars();
  }

  generateBars() {
    this.bars = Array.from(
      { length: this.amount() },
      () => Math.floor(Math.random() * 100) + 1
    );
    this.comparing = null;
    this.swapping = null;
    this.sorted = [];
  }

  private async playComparisonSound(height: number) {
    if (!this.audioContext) {
      this.audioContext = new AudioContext();
    }

    // Tonhöhe basierend auf Balkenhöhe (höherer Balken = höherer Ton)
    const frequency = 200 + height * 10;
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    // Kurzer, sanfter Ton
    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;
    gainNode.gain.value = 0.1;

    oscillator.start();
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      this.audioContext.currentTime + 0.1
    );

    setTimeout(() => {
      oscillator.stop();
      oscillator.disconnect();
      gainNode.disconnect();
    }, 100);
  }

  async startSorting() {
    if (this.running) {
      this.stopSorting = true;
      return;
    }

    this.running = true;
    this.stopSorting = false;
    this.isRunningChange.emit(true);

    if (this.timerEnabled()) {
      this.elapsedTime = 0;
      const startTime = Date.now();
      this.timerInterval = setInterval(() => {
        this.elapsedTime = Date.now() - startTime;
      }, 10);
    }

    this.running = true;
    this.stopSorting = false;
    this.isRunningChange.emit(true);

    let generator;
    switch (this.algorithm()) {
      case ESortingAlgorithm.SELECTION_SORT:
        generator = this.sortingService.selectionSort(this.bars);
        break;
      case ESortingAlgorithm.INSERTION_SORT:
        generator = this.sortingService.insertionSort(this.bars);
        break;
      case ESortingAlgorithm.QUICK_SORT:
        generator = this.sortingService.quickSort(this.bars);
        break;
      case ESortingAlgorithm.MERGE_SORT:
        generator = this.sortingService.mergeSort(this.bars);
        break;
      default:
        generator = this.sortingService.bubbleSort(this.bars);
    }

    try {
      for (const step of generator) {
        if (this.stopSorting) break;

        this.bars = step.array;
        this.comparing = step.comparing || null;

        // Sound abspielen wenn Vergleich stattfindet
        if (this.soundEnabled() && this.comparing) {
          await this.playComparisonSound(this.bars[this.comparing[0]]);
        }

        await new Promise((resolve) =>
          setTimeout(resolve, Math.floor(50 - this.speed() * 0.48))
        );
      }
    } finally {
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
      }
      this.running = false;
      this.isRunningChange.emit(false);
      this.comparing = null;
      this.stopSorting = false;
    }
  }

  resetSorting() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    this.elapsedTime = 0;
    this.running = false;
    this.isRunningChange.emit(false);
    this.generateBars();
  }

  formatTime(ms: number): string {

    if(!this.timerEnabled()){
      return "--:---"
    }

    const seconds = Math.floor(ms / 1000);
    const milliseconds = ms % 1000;
    return `${seconds.toString().padStart(2, '0')}:${milliseconds
      .toString()
      .padStart(3, '0')}`;
  }
}
