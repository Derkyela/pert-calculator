<template>
  <div class="hidden lg:grid lg:grid-cols-12 gap-2 lg:gap-4">
    <div class="lg:col-span-5">Activity Title</div>
    <div>Optimistic Time</div>
    <div>Most Likely Time</div>
    <div>Pessimistic Time</div>
    <div class="text-right">Expected Time</div>
    <div class="col-span-2 text-right">Standard Deviation of Time</div>
  </div>
  <template v-for="activity in activities" :key="activity.id">
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
  </template>
  <div class="flex flex-col lg:grid lg:grid-cols-12 lg:gap-4">
    <div class="col-start-6 lg:px-4 lg:border-l-4 border-transparent">
      <span class="lg:hidden">Total optimistic time: </span>{{ total.optimistic }}
    </div>
    <div class="lg:px-4 lg:border-l-4 border-transparent">
      <span class="lg:hidden">Total most likely time: </span>{{ total.mostLikely }}
    </div>
    <div class="lg:px-4 lg:border-l-4 border-transparent">
      <span class="lg:hidden">Total pessimistic time: </span>{{ total.pessimistic }}
    </div>
    <div class="drac-text-semibold lg:text-right">
      <span class="lg:hidden">Total expected time: </span>{{ total.expectedTime }}
    </div>
    <div class="mt-4 lg:mt-0 lg:col-start-11 lg:col-span-2 text-right">
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
import useSettingsStore from '@/stores/settings';
import Activity from './Activity.vue';

@Options({
  components: {
    Activity,
  },
})

export default class Calculator extends Vue {
  private useActivitiesStore = useActivitiesStore();

  private useSettingsStore = useSettingsStore();

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

  mounted() {
    this.useActivitiesStore.$subscribe((mutation, state) => {
      if (this.useSettingsStore.settings.storeActivities) {
        localStorage.setItem('activities', JSON.stringify(state));
      }
    });
  }
}
</script>
