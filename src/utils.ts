import { ActivityInterface } from '@/interfaces/Activity';

export function round(val: number): number {
  return Math.round(val * 100) / 100;
}

export function toNumber(val: string): number {
  return Number(val.replace(',', '.'));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isActivity(object: any): object is ActivityInterface {
  return 'id' in object
    && typeof object.id === 'number'
    && 'title' in object
    && typeof object.title === 'string'
    && 'optimistic' in object
    && typeof object.optimistic === 'number'
    && 'mostLikely' in object
    && typeof object.mostLikely === 'number'
    && 'pessimistic' in object
    && typeof object.pessimistic === 'number'
    && 'expectedTime' in object
    && typeof object.expectedTime === 'number'
    && 'standardDeviationOfTime' in object
    && typeof object.standardDeviationOfTime === 'number';
}
