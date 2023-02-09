<template>
  <main>
    <h1 class="drac-heading-2xl">PERT Activity Calculator</h1>
    <div class="drac-d-grid drac-mb-sm">
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
      <activity v-model="activities[index]"
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
import { Options, Vue } from 'vue-class-component';
import Activity from './Activity.vue';
// eslint-disable-next-line import/no-unresolved,import/extensions
import round from '../utils';

@Options({
  components: {
    Activity,
  },
  computed: {
    canDelete: Boolean,
    total: {
      optimistic: Number,
      mostLikely: Number,
      pessimistic: Number,
      expectedTime: Number,
    },
  },
})

export default class Calculator extends Vue {
  activityId = 1;

  activities: {
    id: number,
    optimistic: number,
    mostLikely: number,
    pessimistic: number,
    expectedTime: number,
  }[] = [{
    id: 1,
    optimistic: 0,
    mostLikely: 0,
    pessimistic: 0,
    expectedTime: 0,
  }];

  private add(): void {
    this.activityId += 1;
    this.activities.push({
      id: this.activityId,
      optimistic: 0,
      mostLikely: 0,
      pessimistic: 0,
      expectedTime: 0,
    });
  }

  private removeActivity(activityId: number): void {
    if (this.activities.length <= 1) {
      return;
    }

    const index = this.activities.findIndex((activity) => activity.id === activityId);
    this.activities.splice(index, 1);
  }

  private get canDelete(): boolean {
    return this.activities.length > 1;
  }

  private get total(): object {
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

.col-start-12 {
  grid-column-start: 12;
}

.border-l-4-invisible {
  border-left: 4px solid transparent;
}
</style>
