<template>
  <div class="grid grid-cols-12 gap-4 drac-my-sm">
    <div class="col-span-5">Activity Title</div>
    <div>Optimistic Time</div>
    <div>Most Likely Time</div>
    <div>Pessimistic Time</div>
    <div class="drac-text-right">Expected Time</div>
    <div class="col-span-2 drac-text-right">Standard Deviation of Time</div>
  </div>
  <div v-for="activity in activities"
       :key="activity.id"
       class="grid grid-cols-12 gap-4 drac-mb-sm"
  >
    <activity :activity-id="activity.id"
              v-model:title="activity.title"
              v-model:optimistic="activity.optimistic"
              v-model:most-likely="activity.mostLikely"
              v-model:pessimistic="activity.pessimistic"
              v-model:expected-time="activity.expectedTime"
              v-model:standard-deviation-of-time="activity.standardDeviationOfTime"
              :canDelete="canDelete"
              @removeActivity="removeActivity"
    />
  </div>
  <div class="grid grid-cols-12 gap-4">
    <div class="col-start-6 drac-px-sm border-l-4 border-transparent">{{ total.optimistic }}</div>
    <div class="drac-px-sm border-l-4 border-transparent">{{ total.mostLikely }}</div>
    <div class="drac-px-sm border-l-4 border-transparent">{{ total.pessimistic }}</div>
    <div class="drac-text-right drac-text-semibold">{{ total.expectedTime }}</div>
    <div class="col-start-11 col-span-2 drac-text-right">
      <button type="button" @click="add()" class="drac-btn drac-bg-green drac-text-black">
        Add Activity
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { ActivityInterface } from '@/interfaces/Activity';
import { Total } from '@/interfaces/Total';
import { Options, Vue } from 'vue-class-component';
import useActivitiesStore from '@/stores/activities';
import Activity from './Activity.vue';

@Options({
  components: {
    Activity,
  },
})

export default class Calculator extends Vue {
  private useActivitiesStore = useActivitiesStore();

  private get activities(): ActivityInterface[] {
    return this.useActivitiesStore.activities;
  }

  private add(): void {
    this.useActivitiesStore.add();
  }

  private removeActivity(activityId: number): void {
    this.useActivitiesStore.remove(activityId);
  }

  private get canDelete(): boolean {
    return this.useActivitiesStore.canDelete;
  }

  private get total(): Total {
    return this.useActivitiesStore.total;
  }
}
</script>
