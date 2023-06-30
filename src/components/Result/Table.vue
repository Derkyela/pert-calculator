<template>
  <div class="overflow-x-auto lg:overflow-visible">
    <table class="drac-table">
      <thead>
        <tr>
          <th class="pr-4 lg:pr-0">
            Activity Title
          </th>
          <th class="pr-4 lg:pr-0">
            Optimistic Time
          </th>
          <th class="pr-4 lg:pr-0">
            Most Likely Time
          </th>
          <th class="pr-4 lg:pr-0">
            Pessimistic Time
          </th>
          <th class="pr-4 lg:pr-0">
            Expected Time
          </th>
          <th class="pr-4 lg:pr-0">
            Standard Deviation of Time
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="activity in activities"
          :key="activity.id"
        >
          <td
            :class="[{
              'drac-text-white': !markHighStandardDeviationOfTime(activity.standardDeviationOfTime),
              'drac-text-red': markHighStandardDeviationOfTime(activity.standardDeviationOfTime),
            }]"
          >
            <template v-if="markHighStandardDeviationOfTime(activity.standardDeviationOfTime)">
              <strong>!{{ activity.title }}</strong>
            </template>
            <template v-else>
              {{ activity.title }}
            </template>
          </td>
          <td
            :class="[{
              'drac-text-white': !markHighStandardDeviationOfTime(activity.standardDeviationOfTime),
              'drac-text-red': markHighStandardDeviationOfTime(activity.standardDeviationOfTime),
            }]"
          >
            <template v-if="markHighStandardDeviationOfTime(activity.standardDeviationOfTime)">
              <strong>!{{ activity.optimistic }}</strong>
            </template>
            <template v-else>
              {{ activity.optimistic }}
            </template>
          </td>
          <td>{{ activity.mostLikely }}</td>
          <td
            :class="[{
              'drac-text-white': !markHighStandardDeviationOfTime(activity.standardDeviationOfTime),
              'drac-text-red': markHighStandardDeviationOfTime(activity.standardDeviationOfTime),
            }]"
          >
            <template v-if="markHighStandardDeviationOfTime(activity.standardDeviationOfTime)">
              <strong>!{{ activity.pessimistic }}</strong>
            </template>
            <template v-else>
              {{ activity.pessimistic }}
            </template>
          </td>
          <td>{{ activity.expectedTime }}</td>
          <td
            :class="[{
              'drac-text-white': !markHighStandardDeviationOfTime(activity.standardDeviationOfTime),
              'drac-text-red': markHighStandardDeviationOfTime(activity.standardDeviationOfTime),
            }]"
          >
            <template v-if="markHighStandardDeviationOfTime(activity.standardDeviationOfTime)">
              <strong>!{{ activity.standardDeviationOfTime }}</strong>
            </template>
            <template v-else>
              {{ activity.standardDeviationOfTime }}
            </template>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th>Total</th>
          <th class="px-2">
            {{ total.optimistic }}
          </th>
          <th class="px-2">
            {{ total.mostLikely }}
          </th>
          <th class="px-2">
            {{ total.pessimistic }}
          </th>
          <th class="px-2">
            {{ total.expectedTime }}
          </th>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';
import useSettingsStore from '@/stores/settings';
import type { ActivityInterface } from '@/interfaces/Activity';
import type { Total } from '@/interfaces/Total';

defineProps<{
  activities: ActivityInterface[],
  total: Total,
}>();

const settingsStore = useSettingsStore();

const settings = computed(() => settingsStore.settings);

function markHighStandardDeviationOfTime(standardDeviationOfTime: number): boolean {
  if (!settings.value.markHighStandardDeviationOfTime) {
    return false;
  }

  return standardDeviationOfTime > settings.value.standardDeviationOfTimeThreshold;
}
</script>
