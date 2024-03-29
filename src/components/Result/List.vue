<template>
  <ul
    v-if="showUnorderedList"
    ref="html"
    class="drac-list drac-list-unordered my-4"
  >
    <li
      v-for="activity in activities"
      :key="activity.id"
      v-html="getActivityString(activity)"
    />
    <li>{{ getTotalString() }}</li>
  </ul>
  <ol
    v-if="showOrderedList"
    ref="html"
    class="drac-list drac-list-ordered my-4"
  >
    <li
      v-for="activity in activities"
      :key="activity.id"
      v-html="getActivityString(activity)"
    />
    <li>{{ getTotalString() }}</li>
  </ol>
</template>

<script setup lang="ts">
import { computed, defineExpose, defineProps, ref } from 'vue';
import { ListType } from '@/interfaces/Settings';
import type { ActivityInterface } from '@/interfaces/Activity';
import type { Total } from '@/interfaces/Total';
import useSettingsStore from '@/stores/settings';

const props = defineProps<{
  activities: ActivityInterface[],
  listType: string,
  template: string,
  total: Total,
}>();

const html = ref(null);

const settingsStore = useSettingsStore();

const settings = computed(() => settingsStore.settings);

const showUnorderedList = computed(() => props.listType === ListType.Unordered);

const showOrderedList = computed(() => props.listType === ListType.Ordered);

defineExpose({html});

function getActivityString(activity: ActivityInterface): string {
  let activityString = props.template;

  Object.getOwnPropertyNames(activity)
    .forEach((prop) => {
      if (
        prop === 'standardDeviationOfTime'
        && settings.value.markHighStandardDeviationOfTime
        && activity[prop as keyof ActivityInterface]
        > settings.value.standardDeviationOfTimeThreshold
      ) {
        activityString = activityString.replaceAll(
          `#${prop}#`,
          `<span class="drac-text-red">#${prop}#</span>`,
        );
      }

      activityString = activityString.replaceAll(`#${prop}#`, activity[prop as keyof ActivityInterface].toString());
    });

  return activityString;
}

function getTotalString(): string {
  let totalString = props.template;

  totalString = totalString.replaceAll('#title#', 'Total');

  Object.getOwnPropertyNames(props.total)
    .forEach((prop) => {
      totalString = totalString.replaceAll(`#${prop}#`, props.total[prop as keyof Total].toString());
    });

  totalString = totalString.replaceAll(/#\w*#/g, '');

  return totalString;
}
</script>
