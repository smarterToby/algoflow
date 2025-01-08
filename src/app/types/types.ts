import { ESortingAlgorithm } from '../enums/enums';

export interface IAlgorithm {
  name: string;
  description: string;
  timeComplexity: {
    worst: string;
    average: string;
    best: string;
  };
  type: ESortingAlgorithm;
  wikiLink: string;
}

export interface ISortingStep {
  array: number[];
  comparing?: [number, number];
  swapping?: [number, number];
  sorted?: number[];
}