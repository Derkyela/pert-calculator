<template>
  <div v-if="canShow">
    <Component
      :is="settings.resultType"
      :template="settings.template"
      :list-type="settings.listType"
      :activities="activities"
      :total="total"
    />
  </div>
  <p v-else>
    Please add an activity first.
  </p>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import useActivitiesStore from '@/stores/activities';
import useSettingsStore from '@/stores/settings';

const activitiesStore = useActivitiesStore();

const settingsStore = useSettingsStore();

const activities = computed(() => activitiesStore.activities);

const settings = computed(() => settingsStore.settings);

const total = computed(() => activitiesStore.total);

const canShow = computed(() => total.value.expectedTime > 0);
</script>
