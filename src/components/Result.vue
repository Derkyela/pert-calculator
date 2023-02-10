<template>
  <ul class="drac-list drac-my-sm" v-if="canShow">
    <li v-for="activity in activities" :key="activity.id">{{ activityString(activity) }}</li>
  </ul>
  <p v-else>Please add an activity first.</p>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import useActivitiesStore from '@/stores/activities';
import useSettingsStore from '@/stores/settings';
import { ActivityInterface } from '@/interfaces/Activity';
import { SettingsInterface } from '@/interfaces/Settings';

export default class Result extends Vue {
  private useActivitiesStore = useActivitiesStore();

  private useSettingsStore = useSettingsStore();

  private get activities(): ActivityInterface[] {
    return this.useActivitiesStore.activities;
  }

  private get settings(): SettingsInterface {
    return this.useSettingsStore.settings;
  }

  private activityString(activity: ActivityInterface): string {
    let activityString = this.settings.template;

    Object.getOwnPropertyNames(activity).forEach((prop) => {
      activityString = activityString.replaceAll(`#${prop}#`, activity[prop as keyof ActivityInterface].toString());
    });

    return activityString;
  }

  get canShow(): boolean {
    return this.useActivitiesStore.total.expectedTime > 0;
  }
}
</script>
