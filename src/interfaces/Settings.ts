export enum ResultType {
  List = 'List',
  Table = 'Table',
}

export enum ListType {
  Unordered = 'Unordered',
  Ordered = 'Ordered',
}

export interface SettingsInterface {
  resultType: ResultType,
  listType: ListType,
  template: string,
}
