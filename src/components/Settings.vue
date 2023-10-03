<template>
  <div class="drac-box flex flex-col gap-4 my-4">
    <div class="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-4">
      <label for="resultType">Result Type</label>
      <div class="relative">
        <select
          id="resultType"
          v-model="settings.resultType"
          class="drac-select drac-select-white"
        >
          <option
            v-for="Type in resultTypeOptions"
            :key="Type"
          >
            {{ Type }}
          </option>
        </select>
        <div class="drac-select-arrow drac-text-white">
          <svg
            viewBox="0 0 24 24"
            focusable="false"
            role="presentation"
            aria-hidden="true"
          >
            <path
              fill="currentColor"
              d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"
            />
          </svg>
        </div>
      </div>
    </div>
    <div
      v-if="resultTypeIsList()"
      class="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-4"
    >
      <label for="listType">List Type</label>
      <div class="relative">
        <select
          id="listType"
          v-model="settings.listType"
          class="drac-select drac-select-white"
        >
          <option
            v-for="Type in listTypeOptions"
            :key="Type"
          >
            {{ Type }}
          </option>
        </select>
        <div class="drac-select-arrow drac-text-white">
          <svg
            viewBox="0 0 24 24"
            focusable="false"
            role="presentation"
            aria-hidden="true"
          >
            <path
              fill="currentColor"
              d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"
            />
          </svg>
        </div>
      </div>
    </div>
    <div v-if="resultTypeIsList()">
      <div class="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-4">
        <label for="template">Template</label>
        <input
          id="template"
          v-model="settings.template"
          class="flex-shrink drac-input drac-input-white drac-text-white"
        >
      </div>
      <div class="drac-text drac-text-grey my-1.5">
        Available template variable: #title#, #optimistic#, #mostLikely#, #pessimistic#,
        #expectedTime#, <span v-if="settings.useFactor">#factorizedExpectedTime#,</span> #standardDeviationOfTime#
      </div>
    </div>
    <div class="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-4">
      <label for="markHighStandardDeviationOfTime">Mark High Standard Deviation of Time</label>
      <input
        id="markHighStandardDeviationOfTime"
        v-model="settings.markHighStandardDeviationOfTime"
        type="checkbox"
        class="drac-switch drac-checkbox"
        :class="[{
          'drac-switch-green': settings.markHighStandardDeviationOfTime,
          'drac-switch-red': !settings.markHighStandardDeviationOfTime,
        }]"
      >
    </div>
    <div
      v-if="settings.markHighStandardDeviationOfTime"
      class="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-4"
    >
      <label for="standardDeviationOfTimeThreshold">Standard Deviation of Time Threshold</label>
      <div class="lg:w-28">
        <input
          id="standardDeviationOfTimeThreshold"
          :value="settings.standardDeviationOfTimeThreshold"
          class="drac-input drac-input-white drac-text-white"
          @input="settings.standardDeviationOfTimeThreshold
            = convertToNumber(($event.target as HTMLInputElement).value)"
          @focus="($event.target as HTMLInputElement).select()"
        >
      </div>
    </div>
    <div>
      <div class="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-4">
        <label for="markHighStandardDeviationOfTime">Add Factor</label>
        <input
          id="markHighStandardDeviationOfTime"
          v-model="settings.useFactor"
          type="checkbox"
          class="drac-switch drac-checkbox"
          :class="[{
            'drac-switch-green': settings.useFactor,
            'drac-switch-red': !settings.useFactor,
          }]"
        >
      </div>
      <div class="drac-text drac-text-grey my-1.5">
        The factor will be applied to the expected time and might represent time for testing or project management.<br>Example: If the expected time is 12 and each task should include add 30% for testing purposes you may add the factor 1.3 in order to add this 30% testing. Resulting in 15.6.
      </div>
    </div>
    <div
      v-if="settings.useFactor"
      class="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-4"
    >
      <label for="standardDeviationOfTimeThreshold">Factor</label>
      <div class="lg:w-28">
        <input
          id="standardDeviationOfTimeThreshold"
          :value="settings.factor"
          class="drac-input drac-input-white drac-text-white"
          @input="settings.factor
            = convertToNumber(($event.target as HTMLInputElement).value)"
          @focus="($event.target as HTMLInputElement).select()"
        >
      </div>
    </div>
    <div>
      <div class="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-4">
        <label for="storeSettings">Store Settings</label>
        <input
          id="storeSettings"
          v-model="settings.storeSettings"
          type="checkbox"
          class="drac-switch drac-checkbox"
          :class="[{
            'drac-switch-green': settings.storeSettings,
            'drac-switch-red': !settings.storeSettings,
          }]"
        >
      </div>
      <div class="drac-text drac-text-grey my-1.5">
        Settings are stored in local storage and removed if you disable the feature again.
      </div>
    </div>
    <div>
      <div class="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-4">
        <label for="storeActivities">Store Activities</label>
        <input
          id="storeActivities"
          v-model="settings.storeActivities"
          type="checkbox"
          class="drac-switch drac-checkbox"
          :class="[{
            'drac-switch-green': settings.storeActivities,
            'drac-switch-red': !settings.storeActivities,
          }]"
        >
      </div>
      <div class="drac-text drac-text-grey my-1.5">
        Automatically saves the current state of activities local storage and removes it if you
        disable the feature again.
      </div>
    </div>
    <div v-if="!_.isEqual(settingsStore.defaultSettings, settings)">
      <p class="mb-2">
        You can share this settings by copying the link via the button below.
      </p>
      <div class="relative inline-flex flex-col gap-2">
        <CopyNotification>
          <div
            v-if="showFeedback && copySuccess === true"
            class="inline-block drac-bg-black border drac-border-green drac-rounded-lg p-2"
          >
            <span class="text-xs drac-text drac-line-height drac-text-white">Copied</span>
          </div>
        </CopyNotification>
        <CopyNotification>
          <div
            v-if="showFeedback && copySuccess === false"
            class="inline-block drac-bg-black border drac-border-red drac-rounded-lg p-2"
          >
            <span class="text-xs drac-text drac-line-height drac-text-red">Something went wrong copying.</span>
          </div>
        </CopyNotification>
        <button
          type="button"
          class="drac-btn drac-border-green drac-btn-outline drac-text-green"
          @click="copyShareUrl"
          @blur="copySuccess = null; showFeedback = false;"
        >
          Copy Share Link
        </button>
      </div>
    </div>
    <div v-if="doNotImportSettings">
      You have disabled to import settings via url. Click <a
        class="drac-anchor drac-text drac-text-white drac-text-green--hover underline"
        href="#"
        @click.prevent="enableImportingSettings"
      >here</a> to enable it again.
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineEmits, onMounted, ref } from 'vue';
import useActivitiesStore from '@/stores/activities';
import useSettingsStore from '@/stores/settings';
import {ListType, ResultType, type SettingsInterface} from '@/interfaces/Settings';
import {toNumber} from '@/utils';
import CopyNotification from '@/components/Notification/CopyTransition.vue';
import { Buffer } from 'buffer';
import _ from 'lodash';

defineEmits<{
  (e: 'set:standardDeviationOfTimeThreshold', standardDeviationOfTimeThreshold: number): void,
}>();

const settingsStore = useSettingsStore();

const activitiesStore = useActivitiesStore();

const settings = computed<SettingsInterface>(() => settingsStore.settings);

const resultTypeOptions = Object.values(ResultType);

const listTypeOptions = Object.values(ListType);

const showFeedback = ref(false);

const copySuccess = ref<boolean | null>(null);

const doNotImportSettings = ref(localStorage.getItem('doNotImportSettings') === 'true');

onMounted(() => {
  settingsStore.$subscribe((mutation, state) => {
    if (state.settings.storeSettings) {
      localStorage.setItem('settings', JSON.stringify(state));
    } else {
      localStorage.removeItem('settings');
    }

    if (state.settings.storeActivities) {
      localStorage.setItem('activities', JSON.stringify(activitiesStore.activities));
    } else {
      localStorage.removeItem('activities');
    }

    if (state.settings.useFactor) {
      activitiesStore.recalculateFactorizedExpectedTime(state.settings.factor);
    }
  });
});

function resultTypeIsList(): boolean {
  return settings.value.resultType === ResultType.List;
}

function convertToNumber(val: string): number {
  return toNumber(val);
}

function copyShareUrl() {
  showFeedback.value = true;

  const url = new URL(window.location.href);
  const settingsString = Buffer.from(JSON.stringify(settings.value)).toString('base64');
  url.searchParams.set('settings', settingsString);

  try {
    navigator.clipboard.writeText(url.href);
    copySuccess.value = true;
  } catch (e) {
    copySuccess.value = false;
    console.error(e);
  }
}

function enableImportingSettings() {
  doNotImportSettings.value = false;
  localStorage.setItem('doNotImportSettings', 'false');
}
</script>
