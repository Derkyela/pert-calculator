<template>
  <table class="drac-table">
    <thead>
    <tr>
      <th>Activity Title</th>
      <th>Optimistic Time</th>
      <th>Most Likely Time</th>
      <th>Pessimistic Time</th>
      <th>Expected Time</th>
      <th>Standard Deviation of Time</th>
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
      <th class="drac-px-xs">{{ total.optimistic }}</th>
      <th class="drac-px-xs">{{ total.mostLikely }}</th>
      <th class="drac-px-xs">{{ total.pessimistic }}</th>
      <th class="drac-px-xs">{{ total.expectedTime }}</th>
    </tr>
    </tfoot>
  </table>
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
