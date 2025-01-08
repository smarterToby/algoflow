import { ESortingAlgorithm } from '../enums/enums';
import { IAlgorithm } from '../types/types';

export const algorithms: IAlgorithm[] = [
  {
    name: 'Bubble Sort',
    description:
      'Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
    timeComplexity: {
      worst: 'O(n²)',
      average: 'O(n²)',
      best: 'O(n)',
    },
    type: ESortingAlgorithm.BUBBLE_SORT,
    wikiLink: 'https://wikipedia.org/wiki/Bubble_sort',
  },
  {
    name: 'Selection Sort',
    description:
      'Selection Sort divides the input list into two parts: a sorted portion at the left end and an unsorted portion at the right end. It repeatedly selects the smallest element from the unsorted portion and moves it to the sorted portion.',
    timeComplexity: {
      worst: 'O(n²)',
      average: 'O(n²)',
      best: 'O(n²)',
    },
    type: ESortingAlgorithm.SELECTION_SORT,
    wikiLink: 'https://wikipedia.org/wiki/Selection_sort',
  },
  {
    name: 'Insertion Sort',
    description:
      'Insertion Sort builds the final sorted array one item at a time. It iterates through an input array and removes one element per iteration, finds the place the element belongs in the sorted list, and inserts it there.',
    timeComplexity: {
      worst: 'O(n²)',
      average: 'O(n²)',
      best: 'O(n)',
    },
    type: ESortingAlgorithm.INSERTION_SORT,
    wikiLink: 'https://wikipedia.org/wiki/Insertion_sort',
  },
  {
    name: 'Quick Sort',
    description:
      'Quick Sort is a divide-and-conquer algorithm. It works by selecting a "pivot" element from the array and partitioning the other elements into two sub-arrays, according to whether they are less than or greater than the pivot.',
    timeComplexity: {
      worst: 'O(n²)',
      average: 'O(n log n)',
      best: 'O(n log n)',
    },
    type: ESortingAlgorithm.QUICK_SORT,
    wikiLink: 'https://wikipedia.org/wiki/Quicksort',
  },
  {
    name: 'Merge Sort',
    description:
      'Merge Sort is a divide-and-conquer algorithm that divides the input array into two halves, recursively sorts them, and then merges the sorted halves. It consistently delivers O(n log n) performance but requires additional space.',
    timeComplexity: {
      worst: 'O(n log n)',
      average: 'O(n log n)',
      best: 'O(n log n)',
    },
    type: ESortingAlgorithm.MERGE_SORT,
    wikiLink: 'https://wikipedia.org/wiki/Merge_sort',
  },
];
