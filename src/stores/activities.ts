import { defineStore } from 'pinia';
import { ActivityInterface } from '@/interfaces/Activity';
import { Total } from '@/interfaces/Total';
import { round } from '@/utils';

interface State {
  activityId: number
  activities: ActivityInterface[]
}

export default defineStore('activities', {
  state: (): State => ({
    activityId: 1,
    activities: [{
      id: 1,
      title: '',
      optimistic: 0,
      mostLikely: 0,
      pessimistic: 0,
      expectedTime: 0,
      standardDeviationOfTime: 0,
    }],
  }),
  getters: {
    canDelete(): boolean {
      return this.activities.length > 1;
    },
    total(): Total {
      let optimistic = 0;
      let mostLikely = 0;
      let pessimistic = 0;
      let expectedTime = 0;

      this.activities.forEach((activity) => {
        optimistic += activity.optimistic;
        mostLikely += activity.mostLikely;
        pessimistic += activity.pessimistic;
        expectedTime += activity.expectedTime;
      });

      return {
        optimistic: round(optimistic),
        mostLikely: round(mostLikely),
        pessimistic: round(pessimistic),
        expectedTime: round(expectedTime),
      };
    },
  },
  actions: {
    add(): void {
      this.activityId += 1;
      this.activities.push({
        id: this.activityId,
        title: '',
        optimistic: 0,
        mostLikely: 0,
        pessimistic: 0,
        expectedTime: 0,
        standardDeviationOfTime: 0,
      });
    },
    remove(activityId: number): void {
      if (this.activities.length <= 1) {
        return;
      }

      const index = this.activities.findIndex((activity) => activity.id === activityId);
      this.activities.splice(index, 1);
    },
  },
});
