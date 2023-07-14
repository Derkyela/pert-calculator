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
import { isActivity, getHighestActivityId } from '@/utils';
import { defineEmits, ref } from 'vue';
import { get } from '@vueuse/core';

const emit = defineEmits<{
  (e: 'import-success'): void,
  (e: 'import-failure', errors: Array<string>): void,
}>();

const activitiesStore = useActivitiesStore();

const errors = ref<Array<string>>([]);

function addError(message: string): void {
  errors.value.push(message);
}

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
      const errorMessage = `File ${file.name} contains invalid data. File must contain an json array of activities.`;
      console.error(errorMessage);
      addError(errorMessage);
      emit('import-failure', get(errors));
      return;
    }
    activitiesStore.$patch({
      activityId: getHighestActivityId(json),
      activities: json,
    });
    emit('import-success');
  });

  reader.addEventListener('error', () => {
    const errorMessage = `Error occurred reading file: ${file.name}`;
    console.error(errorMessage);
    addError(errorMessage)
    emit('import-failure', get(errors));
  });

  reader.readAsText(file);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isValidActivityArray(array: Array<any>): boolean {
  let valid = true;

  array.forEach((value, index) => {
    if (!isActivity(value)) {
      valid = false;
      const errorMessage = `Value at index ${index} is not an activity object.`;
      console.error(errorMessage);
      addError(errorMessage);
    }
  });

  return valid;
}
</script>
