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
        #expectedTime#, #standardDeviationOfTime#
      </div>
    </div>
    <div class="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-4">
      <label for="markHighStandardDeviationOfTime">Mark Hight Standard Deviation of Time</label>
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
  </div>
</template>

<script setup lang="ts">
import { defineEmits, computed, onMounted } from 'vue';
import useActivitiesStore from '@/stores/activities';
import useSettingsStore from '@/stores/settings';
import { ListType, ResultType, type SettingsInterface } from '@/interfaces/Settings';
import { toNumber } from '@/utils';

defineEmits<{
  (e: 'set:standardDeviationOfTimeThreshold', standardDeviationOfTimeThreshold: number): void,
}>();

const settingsStore = useSettingsStore();

const activitiesStore = useActivitiesStore();

const settings = computed<SettingsInterface>(() => settingsStore.settings);

const resultTypeOptions = Object.values(ResultType);

const listTypeOptions = Object.values(ListType);

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
  });
});

function resultTypeIsList(): boolean {
  return settings.value.resultType === ResultType.List;
}

function convertToNumber(val: string): number {
  return toNumber(val);
}
</script>
