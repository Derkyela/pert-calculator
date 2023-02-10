export function round(val: number): number {
  return Math.round(val * 100) / 100;
}

export function toNumber(val: string): number {
  return Number(val.replace(',', '.'));
}
