export interface ActivityInterface extends Record<string, any> {
  id: number,
  title: string,
  optimistic: number,
  mostLikely: number,
  pessimistic: number,
  expectedTime: number,
  factorizedExpectedTime: number,
  standardDeviationOfTime: number,
}
