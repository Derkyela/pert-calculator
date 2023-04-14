import { defineStore } from 'pinia';
import { ListType, ResultType, type SettingsInterface } from '@/interfaces/Settings';

interface State {
  settings: SettingsInterface
}

export default defineStore('settings', {
  state: (): State => ({
    settings: {
      resultType: ResultType.List,
      listType: ListType.Unordered,
      template: '#title#: #optimistic# - #mostLikely# - #pessimistic# -> #expectedTime#',
      markHighStandardDeviationOfTime: false,
      standardDeviationOfTimeThreshold: 1,
      storeSettings: false,
      storeActivities: false,
    },
  }),
});
