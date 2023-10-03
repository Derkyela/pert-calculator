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
        v-for="(x, tab) in tabs"
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
  <Teleport to="body">
    <Modal
      :show="showImportSettingsModal"
      @close="handleCloseImportSettingModal"
    >
      <template #header>
        <h3 class="text-lg p-6">
          Would you like to import this settings?
        </h3>
      </template>
      <template #body>
        <div class="p-6 self-center flex-grow flex flex-col gap-y-2">
          <div>Result Type: {{ settingsToImport.resultType }}</div>
          <div v-if="settingsToImport.resultType === ResultType.List">
            List Type: {{ settingsToImport.listType }}
          </div>
          <div v-if="settingsToImport.resultType === ResultType.List">
            Template: {{ settingsToImport.template }}
          </div>
          <div>
            Mark High Standard Deviation of Time: {{ settingsToImport.markHighStandardDeviationOfTime }}
          </div>
          <div v-if="settingsToImport.markHighStandardDeviationOfTime">
            Standard Deviation of Time Threshold: {{ settingsToImport.standardDeviationOfTimeThreshold }}
          </div>
          <div>Add Factor: {{ settingsToImport.useFactor }}</div>
          <div v-if="settingsToImport.useFactor">
            Factor: {{ settingsToImport.factor }}
          </div>
          <div>
            <div>
              Store Settings: {{ settingsToImport.storeSettings }}
            </div>
            <div
              v-if="settingsToImport.storeSettings"
              class="drac-text drac-text-grey-secondary"
            >
              The settings will be stored in local storage.
            </div>
          </div>
          <div>
            <div>
              Store Activities: {{ settingsToImport.storeActivities }}
            </div>
            <div
              v-if="settingsToImport.storeActivities"
              class="drac-text drac-text-grey-secondary"
            >
              The activities will be stored in local storage.
            </div>
          </div>
          <div>
            <div class="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-4 mt-6">
              <label for="markHighStandardDeviationOfTime">Do not ask again to import settings</label>
              <input
                id="markHighStandardDeviationOfTime"
                v-model="doNotImportSettings"
                type="checkbox"
                class="drac-switch drac-checkbox"
                :class="[{
                  'drac-switch-green': doNotImportSettings,
                  'drac-switch-red': !doNotImportSettings,
                }]"
              >
            </div>
            <div class="drac-text drac-text-grey-secondary">
              This will be stored in local storage.
            </div>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="p-6 flex gap-4 justify-end">
          <button
            type="button"
            class="drac-btn drac-border-red drac-btn-outline drac-text-red"
            title="Close modal"
            @click="handleCloseImportSettingModal"
          >
            Close
          </button>
          <button
            type="button"
            class="drac-btn drac-border-green drac-btn-outline drac-text-green"
            title="Close modal"
            @click="importSettings"
          >
            Import
          </button>
        </div>
      </template>
    </Modal>
  </Teleport>
</template>

<script setup lang="ts">
import type { Component } from 'vue';
import { onMounted, ref } from 'vue';
import Result from '@/components/Result.vue';
import Settings from '@/components/Settings.vue';
import useActivitiesStore from '@/stores/activities';
import useSettingsStore from '@/stores/settings';
import Calculator from './components/Calculator.vue';
import Import from '@/components/Import.vue';
import { Buffer } from 'buffer';
import Modal from '@/components/Modal.vue';
import _ from 'lodash';
import { ResultType } from '@/interfaces/Settings';

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

const showImportSettingsModal = ref(false);

const settingsToImport = ref(settingsStore.defaultSettings);

const doNotImportSettings = ref(localStorage.getItem('doNotImportSettings') === 'true');

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

function removeSettingsFromUrl() {
  const url = new URL(window.location.href);
  url.searchParams.delete('settings');
  window.history.pushState({}, document.title, url.href);
}

onMounted(() => {
  const params = new URLSearchParams(window.location.search);
  if (params.has('settings')) {
    const settingsFromUrl = JSON.parse(Buffer.from(params.get('settings') || '', 'base64').toString());
    settingsToImport.value = {...settingsToImport.value, ...settingsFromUrl};

    if (doNotImportSettings.value || _.isEqual(settingsStore.settings, settingsToImport.value)) {
      removeSettingsFromUrl();

      return;
    }

    showImportSettingsModal.value = true;
  }
});

function importSettings() {
  settingsStore.$patch({settings: settingsToImport.value});
  handleCloseImportSettingModal();
}

function handleCloseImportSettingModal() {
  localStorage.setItem('doNotImportSettings', doNotImportSettings.value.toString());
  showImportSettingsModal.value = false;
  removeSettingsFromUrl()
}
</script>

<style>
.drac-tab-link {
  @apply cursor-pointer;
}
</style>
