import { Component, input, OnChanges } from '@angular/core';
import { IAlgorithm } from '../../types/types';
import { ESortingAlgorithm } from '../../enums/enums';
import { algorithms } from '../../constants/constants';

@Component({
  selector: 'app-algorithm-info',
  imports: [],
  templateUrl: './algorithm-info.component.html',
  styleUrl: './algorithm-info.component.css'
})
export class AlgorithmInfoComponent implements OnChanges{
  readonly algorithm = input<ESortingAlgorithm>();
  algorithmData: IAlgorithm | null = null

  ngOnChanges() {
    if (this.algorithm) {
      this.algorithmData = algorithms.find(algo => algo.type === this.algorithm())!;
    }
  }

}
