<template>
  <div class="hidden lg:grid lg:grid-cols-12 gap-2 lg:gap-4">
    <div class="lg:col-span-5">
      Activity Title
    </div>
    <div>Optimistic Time</div>
    <div>Most Likely Time</div>
    <div>Pessimistic Time</div>
    <div class="text-right">
      Expected Time
    </div>
    <template v-if="settingsStore.settings.useFactor">
      <div class="text-right">
        Factorized Expected Time
      </div>
    </template>
    <div
      class="col-span-2 text-right"
      :class="{
        'col-span-1': settingsStore.settings.useFactor,
        'col-span-2': !settingsStore.settings.useFactor,
      }"
    >
      Standard Deviation of Time
    </div>
  </div>
  <template
    v-for="activity in activities"
    :key="activity.id"
  >
    <Activity
      v-model:title="activity.title"
      v-model:optimistic="activity.optimistic"
      v-model:most-likely="activity.mostLikely"
      v-model:pessimistic="activity.pessimistic"
      v-model:expected-time="activity.expectedTime"
      v-model:factorized-expected-time="activity.factorizedExpectedTime"
      v-model:standard-deviation-of-time="activity.standardDeviationOfTime"
      :activity-id="activity.id"
      :can-delete="canDelete"
      @remove-activity="removeActivity"
    />
  </template>
  <div class="flex flex-col lg:grid lg:grid-cols-12 lg:gap-4">
    <div class="col-start-6 lg:px-4 lg:border-l-4 border-transparent">
      <span class="lg:hidden">Total optimistic time: </span>{{ total.optimistic }}
    </div>
    <div class="lg:px-4 lg:border-l-4 border-transparent">
      <span class="lg:hidden">Total most likely time: </span>{{ total.mostLikely }}
    </div>
    <div class="lg:px-4 lg:border-l-4 border-transparent">
      <span class="lg:hidden">Total pessimistic time: </span>{{ total.pessimistic }}
    </div>
    <div class="drac-text-semibold lg:text-right">
      <span class="lg:hidden">Total expected time: </span>{{ total.expectedTime }}
    </div>
    <template v-if="settingsStore.settings.useFactor">
      <div class="drac-text-semibold lg:text-right">
        <span class="lg:hidden">Factorized total expected time: </span>{{ total.factorizedExpectedTime }}
      </div>
    </template>
    <div class="mt-4 lg:mt-0 lg:col-start-11 lg:col-span-2 text-right">
      <button
        type="button"
        class="drac-btn drac-bg-green drac-text-black"
        @click="add()"
      >
        Add Activity
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import useActivitiesStore from '@/stores/activities';
import useSettingsStore from '@/stores/settings';
import Activity from '@/components/Activity.vue';
import { computed, onMounted } from 'vue';

const activitiesStore = useActivitiesStore();
const settingsStore = useSettingsStore();

const activities = computed(() => activitiesStore.activities);
const canDelete = computed(() => activitiesStore.canDelete);
const total = computed(() => activitiesStore.total);

function add(): void {
  activitiesStore.add();
}

function removeActivity(activityId: number): void {
  activitiesStore.remove(activityId);
}

onMounted(() => {
  activitiesStore.$subscribe((mutation, state) => {
    if (settingsStore.settings.storeActivities) {
      localStorage.setItem('activities', JSON.stringify(state));
    }
  });
});
</script>
