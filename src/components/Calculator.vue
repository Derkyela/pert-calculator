<template>
  <main class="container mx-auto py-16">
    <h1>PERT Activity Calculator</h1>
    <div class="row bg-background border-b-2 py-8 border-foreground sticky top-0">
      <div class="headline col-span-5">Activity Title</div>
      <div class="headline">Optimistic Time</div>
      <div class="headline">Most Likely Time</div>
      <div class="headline">Pessimistic Time</div>
      <div class="headline">Expected Time</div>
      <div class="headline col-span-2">Standard Deviation of Time</div>
    </div>
    <div v-for="(activity, index) in activities"
         :key="activity.id"
         class="row"
    >
      <activity v-model="activities[index]"
                :canDelete="canDelete"
                @removeActivity="removeActivity"/>
    </div>
    <div class="row bg-background border-t-2 py-8 border-foreground sticky bottom-0">
      <div class="value col-start-6">{{ total.optimistic }}</div>
      <div class="value">{{ total.mostLikely }}</div>
      <div class="value">{{ total.pessimistic }}</div>
      <div class="value">{{ total.expectedTime }}</div>
      <div class="col-start-11 col-span-2 flex justify-end">
        <button type="button" @click="add()" class="bg-green rounded-md text-background px-4 py-2">
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
.headline {
  @apply font-semibold;
}

.row {
  @apply grid grid-cols-12 gap-x-8 mb-8;
}

.value {
  @apply bg-background px-4 py-2 border-2 rounded-md border-cyan;
}
</style>
