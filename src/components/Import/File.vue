<template>
  <label
    for="activitiesFile"
    class="drac-btn drac-border-green drac-btn-outline drac-text-green"
  >
    Import via file
  </label>
  <input
    id="activitiesFile"
    type="file"
    class="hidden"
    accept="application/json"
    @change="importActivities($event)"
  >
</template>

<script setup lang="ts">
import useActivitiesStore from '@/stores/activities';
import { isActivity } from '@/utils';
import type { ActivityInterface } from '@/interfaces/Activity';
import { defineEmits } from 'vue';

const emit = defineEmits<{
  (e: 'import-success'): void,
  (e: 'import-error'): void,
}>();

const activitiesStore = useActivitiesStore();

function importActivities(event: Event): void {
  const element = event.currentTarget as HTMLInputElement;
  const file = element.files?.item(0);
  if (!file) {
    return;
  }

  const reader = new FileReader();

  reader.addEventListener('load', () => {
    const json = JSON.parse(reader.result as string);
    if (!Array.isArray(json) || !isValidActivityArray(json)) {
      console.error(`File ${file.name} contains invalid data. File must contain an json array of activities.`);
      return;
    }
    activitiesStore.$patch({
      activityId: getHighestActivityId(json),
      activities: json,
    });
    emit('import-success');
  });

  reader.addEventListener('error', () => {
    console.error(`Error occurred reading file: ${file.name}`);
  });

  reader.readAsText(file);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isValidActivityArray(array: Array<any>): boolean {
  let valid = true;

  array.forEach((value, index) => {
    if (!isActivity(value)) {
      valid = false;
      console.error(`Value at index ${index} is not an activity object.`);
    }
  });

  return valid;
}

function getHighestActivityId(array: Array<ActivityInterface>): number {
  return array.reduce(
    (highestId, activity) => (activity.id > highestId ? activity.id : highestId),
    1,
  );
}
</script>
