<template>
  <main>
    <h1 class="drac-heading-2xl">PERT Activity Calculator</h1>
    <div class="drac-d-grid drac-my-sm">
      <div class="col-span-5">Activity Title</div>
      <div>Optimistic Time</div>
      <div>Most Likely Time</div>
      <div>Pessimistic Time</div>
      <div class="drac-text-right">Expected Time</div>
      <div class="col-span-2 drac-text-right">Standard Deviation of Time</div>
    </div>
    <div v-for="(activity, index) in activities"
         :key="activity.id"
         class="drac-d-grid drac-mb-sm"
    >
      <activity :activity-id="activities[index].id"
                v-model:title="activities[index].title"
                v-model:optimistic="activities[index].optimistic"
                v-model:most-likely="activities[index].mostLikely"
                v-model:pessimistic="activities[index].pessimistic"
                v-model:expected-time="activities[index].expectedTime"
                :canDelete="canDelete"
                @removeActivity="removeActivity"
      />
    </div>
    <div class="drac-d-grid">
      <div class="col-start-6 drac-px-sm border-l-4-invisible">{{ total.optimistic }}</div>
      <div class="drac-px-sm border-l-4-invisible">{{ total.mostLikely }}</div>
      <div class="drac-px-sm border-l-4-invisible">{{ total.pessimistic }}</div>
      <div class="drac-text-right drac-text-semibold">{{ total.expectedTime }}</div>
      <div class="col-start-11 col-span-2 drac-text-right">
        <button type="button" @click="add()" class="drac-btn drac-bg-green">
          Add Activity
        </button>
      </div>
    </div>
  </main>
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

<style>
.drac-d-grid {
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 1rem;
}

.col-span-2 {
  grid-column: span 2 / span 2;
}

.col-span-5 {
  grid-column: span 5 / span 5;
}

.col-start-6 {
  grid-column-start: 6;
}

.col-start-11 {
  grid-column-start: 11;
}

.border-l-4-invisible {
  border-left: 4px solid transparent;
}
</style>
