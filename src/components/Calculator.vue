<template>
  <main>
    <h1>PERT Activity Calculator</h1>
    <div>
      <div>Activity Title</div>
      <div>Optimistic Time</div>
      <div>Most Likely Time</div>
      <div>Pessimistic Time</div>
      <div>Expected Time</div>
      <div>Standard Deviation of Time</div>
    </div>
    <div v-for="(activity, index) in activities"
         :key="activity.id"
    >
      <activity v-model="activities[index]"
                :canDelete="canDelete"
                @removeActivity="removeActivity"/>
    </div>
    <div class="row bg-background border-t-2 py-8 border-foreground sticky bottom-0">
      <div>{{ total.optimistic }}</div>
      <div>{{ total.mostLikely }}</div>
      <div>{{ total.pessimistic }}</div>
      <div>{{ total.expectedTime }}</div>
      <div>
        <button type="button" @click="add()">
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
</style>
