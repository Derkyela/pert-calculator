import type { ActivityInterface } from '@/interfaces/Activity';

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

export function getHighestActivityId(array: Array<ActivityInterface>): number {
  return array.reduce(
    (highestId, activity) => (activity.id > highestId ? activity.id : highestId),
    1,
  );
}

export function toPropertyType<T extends string | number | boolean>(property: T, input: string): T {
  const methods: {[index: string]: any} = {
    string: String.bind(null, input),
    number: Number.bind(null, input),
    boolean: Boolean.bind(null, input),
  }

  if (methods[typeof property] === undefined) {
    console.debug('Type:', typeof property);
    throw 'Unsupported type';
  }

  return methods[typeof property]();
}

export function calcExpectedTime(optimistic: number, mostLikely: number, pessimistic: number): number {
  return (optimistic + 4 * mostLikely + pessimistic) / 6
}

export function calcStandardDeviationOfTime(pessimistic: number, optimistic: number): number {
  return (pessimistic - optimistic) / 6;
}
