<template>
  <div class="flex items-start justify-between">
    <h1 class="drac-heading text-4xl lg:text-5xl mb-4 flex-1">PERT Activity Calculator</h1>
    <a href="https://github.com/Derkyela/pert-calculator"
       title="PERT Calculator Github Repository"
       target="_blank"
    >
      <img alt="GitHub Repo"
           src="https://img.shields.io/static/v1?label=&message=GitHub&color=8aff80&style=flat&logo=github&logoColor=21222c"
      >
    </a>
  </div>
  <nav class="overflow-x-auto">
    <ul class="drac-tabs drac-tabs-white">
      <li v-for="(_, tab) in tabs"
          :key="tab"
          class="drac-tab"
          :class="[{'drac-tab-active': currentTab === tab}]"
      >
        <a @click="currentTab = tab"
           @keydown.space="currentTab = tab"
           class="drac-tab-link drac-text"
           tabindex="0"
        >{{ tab }}</a>
      </li>
    </ul>
  </nav>
  <main class="flex flex-col gap-4 py-4">
    <Component :is="tabs[currentTab]" />
  </main>
</template>

<script setup lang="ts">
import './assets/index.css';
import { ref } from 'vue';
import Result from '@/components/Result.vue';
import Settings from '@/components/Settings.vue';
import useActivitiesStore from '@/stores/activities';
import useSettingsStore from '@/stores/settings';
import Calculator from './components/Calculator.vue';

const tabs = {
  Calculator,
  Result,
  Settings,
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
</script>

<style>
.drac-tab-link {
  @apply cursor-pointer;
}
</style>
