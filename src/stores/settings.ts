import { defineStore } from 'pinia';
import { ListType, ResultType, type SettingsInterface } from '@/interfaces/Settings';

interface State {
  settings: SettingsInterface
}

const defaultSettings: SettingsInterface = {
  resultType: ResultType.List,
  listType: ListType.Unordered,
  template: '#title#: #optimistic# - #mostLikely# - #pessimistic# -> #expectedTime#',
  markHighStandardDeviationOfTime: false,
  standardDeviationOfTimeThreshold: 1,
  useFactor: false,
  factor: 1,
  storeSettings: false,
  storeActivities: false,
};
export default defineStore('settings', {
  state: (): State => ({
    settings: {...defaultSettings},
  }),
  getters: {
    defaultSettings: () => {
      return {...defaultSettings};
    },
  },
});
