<template>
  <div class="overflow-x-auto lg:overflow-visible">
    <table
      ref="html"
      class="drac-table"
    >
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
          <template v-if="settings.useFactor">
            <th class="pr-4 lg:pr-0">
              Factorized Expected Time
            </th>
          </template>
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
            {{ activity.title }}
          </td>
          <td
            :class="[{
              'drac-text-white': !markHighStandardDeviationOfTime(activity.standardDeviationOfTime),
              'drac-text-red': markHighStandardDeviationOfTime(activity.standardDeviationOfTime),
            }]"
          >
            {{ activity.optimistic }}
          </td>
          <td>{{ activity.mostLikely }}</td>
          <td
            :class="[{
              'drac-text-white': !markHighStandardDeviationOfTime(activity.standardDeviationOfTime),
              'drac-text-red': markHighStandardDeviationOfTime(activity.standardDeviationOfTime),
            }]"
          >
            {{ activity.pessimistic }}
          </td>
          <td>{{ activity.expectedTime }}</td>
          <template v-if="settings.useFactor">
            <td>{{ activity.factorizedExpectedTime }}</td>
          </template>
          <td
            :class="[{
              'drac-text-white': !markHighStandardDeviationOfTime(activity.standardDeviationOfTime),
              'drac-text-red': markHighStandardDeviationOfTime(activity.standardDeviationOfTime),
            }]"
          >
            <template v-if="markHighStandardDeviationOfTime(activity.standardDeviationOfTime)">
              <strong>{{ activity.standardDeviationOfTime }} !</strong>
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
          <template v-if="settings.useFactor">
            <th class="px-2">
              {{ total.factorizedExpectedTime }}
            </th>
          </template>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script setup lang="ts">
import { computed, defineExpose, defineProps, ref } from 'vue';
import useSettingsStore from '@/stores/settings';
import type { ActivityInterface } from '@/interfaces/Activity';
import type { Total } from '@/interfaces/Total';

defineProps<{
  activities: ActivityInterface[],
  total: Total,
}>();

const html = ref(null);

const settingsStore = useSettingsStore();

const settings = computed(() => settingsStore.settings);

defineExpose({html});

function markHighStandardDeviationOfTime(standardDeviationOfTime: number): boolean {
  if (!settings.value.markHighStandardDeviationOfTime) {
    return false;
  }

  return standardDeviationOfTime > settings.value.standardDeviationOfTimeThreshold;
}
</script>
