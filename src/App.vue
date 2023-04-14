<template>
  <div class="flex items-start justify-between">
    <h1 class="drac-heading text-4xl lg:text-5xl mb-4 flex-1">
      PERT Activity Calculator
    </h1>
    <a
      href="https://github.com/Derkyela/pert-calculator"
      title="PERT Calculator Github Repository"
      target="_blank"
    >
      <img
        alt="GitHub Repo"
        src="https://img.shields.io/static/v1?label=&message=GitHub&color=8aff80&style=flat&logo=github&logoColor=21222c"
      >
    </a>
  </div>
  <nav class="overflow-x-auto flex justify-between">
    <ul class="drac-tabs drac-tabs-white">
      <li
        v-for="(_, tab) in tabs"
        :key="tab"
        class="drac-tab"
        :class="[{'drac-tab-active': currentTab === tab}]"
      >
        <a
          class="drac-tab-link drac-text"
          tabindex="0"
          @click="currentTab = tab"
          @keydown.space="currentTab = tab"
        >{{ tab }}</a>
      </li>
    </ul>
    <div class="flex gap-4">
      <label
        for="activitiesFile"
        class="drac-btn drac-border-green drac-btn-outline drac-text-green"
      >
        Import Activities
      </label>
      <input
        id="activitiesFile"
        type="file"
        class="hidden"
        accept="application/json"
        @change="importActivities($event)"
      >
      <a
        :href="getActivitiesExportString()"
        download="activities.json"
        class="drac-btn drac-border-green drac-btn-outline drac-text-green"
      >
        Export Activities
      </a>
      <button
        type="button"
        title="Remove all activities"
        class="drac-btn drac-border-red drac-btn-outline drac-text-red"
        @click="removeActivities()"
      >
        Clear
      </button>
    </div>
  </nav>
  <main class="flex flex-col gap-4 py-4">
    <Component :is="tabs[currentTab as keyof Tabs]" />
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Component } from 'vue';
import Result from '@/components/Result.vue';
import Settings from '@/components/Settings.vue';
import useActivitiesStore from '@/stores/activities';
import useSettingsStore from '@/stores/settings';
import { isActivity } from '@/utils';
import type { ActivityInterface } from '@/interfaces/Activity';
import Calculator from './components/Calculator.vue';

interface Tabs {
  Calculator: Component,
  Result: Component,
  Settings: Component,
}

const tabs: Tabs = {
  Calculator: Calculator,
  Result: Result,
  Settings: Settings,
};
const currentTab = ref('Calculator');

const activitiesStore = useActivitiesStore();
const settingsStore = useSettingsStore();

const settings = localStorage.getItem('settings');
if (settings !== null) {
  settingsStore.$patch(JSON.parse(settings));
}
const activities = localStorage.getItem('activities');
if (activities !== null) {
  activitiesStore.$patch(JSON.parse(activities));
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
  });

  reader.addEventListener('error', () => {
    console.error(`Error occurred reading file: ${file.name}`);
  });

  reader.readAsText(file);
}

function getActivitiesExportString() {
  const encodedActivities = encodeURIComponent(JSON.stringify(activitiesStore.activities));

  return `data:application/json;charset=utf-8,${encodedActivities}`;
}

function removeActivities() {
  // eslint-disable-next-line no-alert
  if (window.confirm('Are you sure you want to remove all activities?')) {
    activitiesStore.$reset();
  }
}
</script>

<style>
.drac-tab-link {
  @apply cursor-pointer;
}
</style>
