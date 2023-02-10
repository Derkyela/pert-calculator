export enum ResultType {
  List = 'List',
  Table = 'Table',
}

export enum ListType {
  Unordered = 'ul',
  Ordered = 'ol',
}

export interface SettingsInterface {
  resultType: ResultType,
  listType: ListType,
  template: string,
}
