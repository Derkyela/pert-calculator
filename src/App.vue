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
  <nav class="overflow-x-auto flex justify-between flex-wrap gap-4">
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
    <div class="flex gap-4 flex-wrap">
      <Import />
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
  <div
    id="messages"
    class="fixed bottom-4 right-4 w-96 flex flex-col gap-2"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Component } from 'vue';
import Result from '@/components/Result.vue';
import Settings from '@/components/Settings.vue';
import useActivitiesStore from '@/stores/activities';
import useSettingsStore from '@/stores/settings';
import Calculator from './components/Calculator.vue';
import Import from "@/components/Import.vue";

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
