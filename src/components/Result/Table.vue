<template>
  <div class="overflow-x-auto lg:overflow-visible">
    <table class="drac-table">
      <thead>
      <tr>
        <th class="pr-4 lg:pr-0">Activity Title</th>
        <th class="pr-4 lg:pr-0">Optimistic Time</th>
        <th class="pr-4 lg:pr-0">Most Likely Time</th>
        <th class="pr-4 lg:pr-0">Pessimistic Time</th>
        <th class="pr-4 lg:pr-0">Expected Time</th>
        <th class="pr-4 lg:pr-0">Standard Deviation of Time</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="activity in activities" :key="activity.id">
        <td :class="[{
          'drac-text-white': !markHighStandardDeviationOfTime(activity.standardDeviationOfTime),
          'drac-text-red': markHighStandardDeviationOfTime(activity.standardDeviationOfTime)
        }]"
        >{{ activity.title }}</td>
        <td :class="[{
          'drac-text-white': !markHighStandardDeviationOfTime(activity.standardDeviationOfTime),
          'drac-text-red': markHighStandardDeviationOfTime(activity.standardDeviationOfTime)
        }]"
        >{{ activity.optimistic }}</td>
        <td>{{ activity.mostLikely }}</td>
        <td :class="[{
          'drac-text-white': !markHighStandardDeviationOfTime(activity.standardDeviationOfTime),
          'drac-text-red': markHighStandardDeviationOfTime(activity.standardDeviationOfTime)
        }]"
        >{{ activity.pessimistic }}</td>
        <td>{{ activity.expectedTime }}</td>
        <td :class="[{
          'drac-text-white': !markHighStandardDeviationOfTime(activity.standardDeviationOfTime),
          'drac-text-red': markHighStandardDeviationOfTime(activity.standardDeviationOfTime)
        }]"
        >{{ activity.standardDeviationOfTime }}</td>
      </tr>
      </tbody>
      <tfoot>
      <tr>
        <th>Total</th>
        <th class="px-2">{{ total.optimistic }}</th>
        <th class="px-2">{{ total.mostLikely }}</th>
        <th class="px-2">{{ total.pessimistic }}</th>
        <th class="px-2">{{ total.expectedTime }}</th>
      </tr>
      </tfoot>
    </table>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { SettingsInterface } from '@/interfaces/Settings';
import useSettingsStore from '@/stores/settings';

@Options({
  props: {
    activities: {
      type: Array,
      required: true,
    },
    total: {
      type: Array,
      required: true,
    },
  },
})
export default class Result extends Vue {
  private useSettingsStore = useSettingsStore();

  private get settings(): SettingsInterface {
    return this.useSettingsStore.settings;
  }

  private markHighStandardDeviationOfTime(standardDeviationOfTime: number): boolean {
    if (!this.settings.markHighStandardDeviationOfTime) {
      return false;
    }

    return standardDeviationOfTime > this.settings.standardDeviationOfTimeThreshold;
  }
}
</script>
