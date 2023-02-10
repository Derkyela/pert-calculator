export interface ActivityInterface {
  id: number,
  title: string,
  optimistic: number,
  mostLikely: number,
  pessimistic: number,
  expectedTime: number,
}
