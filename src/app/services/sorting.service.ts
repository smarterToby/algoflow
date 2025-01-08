import { Injectable } from '@angular/core';
import { ISortingStep } from '../types/types';

@Injectable({
  providedIn: 'root'
})
export class SortingService {

  *bubbleSort(array: number[]): Generator<ISortingStep> {
    const arr = [...array];
    const sorted: number[] = [];
    
    for (let i = 0; i < arr.length; i++) {
      let swapped = false;
      
      for (let j = 0; j < arr.length - i - 1; j++) {
        // Vergleichsschritt
        yield { 
          array: [...arr], 
          comparing: [j, j + 1],
          sorted: [...sorted]
        };
        
        if (arr[j] > arr[j + 1]) {
          // Tauschschritt
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          swapped = true;
          yield { 
            array: [...arr], 
            swapping: [j, j + 1],
            sorted: [...sorted]
          };
        }
      }
      
      // Element ist sortiert
      sorted.unshift(arr.length - 1 - i);
      
      if (!swapped) {
        // Array ist sortiert
        while (sorted.length < arr.length) {
          sorted.unshift(sorted.length);
        }
        break;
      }
    }

    return { array: arr, sorted: sorted };
  }

  *quickSort(arr: number[]): Generator<ISortingStep> {
    const array = [...arr];
    
    yield* this.quickSortHelper(array, 0, array.length - 1);
    
    return { array };
  }
  
  private *quickSortHelper(array: number[], low: number, high: number): Generator<ISortingStep> {
    if (low < high) {
      const pivotIndex = yield* this.partition(array, low, high);
      yield* this.quickSortHelper(array, low, pivotIndex - 1);
      yield* this.quickSortHelper(array, pivotIndex + 1, high);
    }
    return { array };
  }

  private *partition(array: number[], low: number, high: number): Generator<ISortingStep> {
    const pivot = array[high];
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
      yield { array: [...array], comparing: [j, high] };
      
      if (array[j] <= pivot) {
        i++;
        [array[i], array[j]] = [array[j], array[i]];
        if (i !== j) {
          yield { array: [...array], swapping: [i, j] };
        }
      }
    }
    
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    yield { array: [...array], swapping: [i + 1, high] };
    
    return i + 1;
  }

  *mergeSort(arr: number[]): Generator<ISortingStep> {
    const array = [...arr];
    yield* this.mergeSortHelper(array, 0, array.length - 1);
    return { array };
  }

  private *mergeSortHelper(array: number[], left: number, right: number): Generator<ISortingStep> {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      yield* this.mergeSortHelper(array, left, mid);
      yield* this.mergeSortHelper(array, mid + 1, right);
      yield* this.merge(array, left, mid, right);
    }
    return { array };
  }

  private *merge(array: number[], left: number, mid: number, right: number): Generator<ISortingStep> {
    const leftArray = array.slice(left, mid + 1);
    const rightArray = array.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;

    while (i < leftArray.length && j < rightArray.length) {
      yield { array: [...array], comparing: [left + i, mid + 1 + j] };
      
      if (leftArray[i] <= rightArray[j]) {
        array[k] = leftArray[i];
        i++;
      } else {
        array[k] = rightArray[j];
        j++;
      }
      yield { array: [...array], swapping: [k, k] };
      k++;
    }

    while (i < leftArray.length) {
      array[k] = leftArray[i];
      yield { array: [...array], swapping: [k, k] };
      i++;
      k++;
    }

    while (j < rightArray.length) {
      array[k] = rightArray[j];
      yield { array: [...array], swapping: [k, k] };
      j++;
      k++;
    }

    return { array };
  }

  *selectionSort(arr: number[]): Generator<ISortingStep> {
    const array = [...arr];
    
    for (let i = 0; i < array.length; i++) {
      let minIndex = i;
      
      // Finde das Minimum im unsortierten Teil
      for (let j = i + 1; j < array.length; j++) {
        yield { array: [...array], comparing: [minIndex, j] };
        if (array[j] < array[minIndex]) {
          minIndex = j;
        }
      }
      
      // Tausche nur wenn nötig
      if (minIndex !== i) {
        [array[i], array[minIndex]] = [array[minIndex], array[i]];
        yield { array: [...array], swapping: [i, minIndex] };
      }
    }
    
    return { array };
  }

  *insertionSort(arr: number[]): Generator<ISortingStep> {
    const array = [...arr];
    
    for (let i = 1; i < array.length; i++) {
      const key = array[i];
      let j = i - 1;
      
      // Vergleiche und verschiebe Elemente
      while (j >= 0) {
        yield { array: [...array], comparing: [j, j + 1] };
        
        if (array[j] > key) {
          array[j + 1] = array[j];
          yield { array: [...array], swapping: [j, j + 1] };
          j--;
        } else {
          break;
        }
      }
      
      array[j + 1] = key;
      if (j + 1 !== i) {
        yield { array: [...array], swapping: [j + 1, i] };
      }
    }
    
    return { array };
  }
}