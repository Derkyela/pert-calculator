<template>
  <ul class="drac-list" v-if="canShow">
    <li v-for="activity in activities" :key="activity.id">{{ activityString(activity) }}</li>
  </ul>
  <p v-else>Please add some activities first.</p>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import useActivitiesStore from '@/stores/activities';
import { ActivityInterface } from '@/interfaces/Activity';

export default class Result extends Vue {
  private useActivitiesStore = useActivitiesStore();

  private template = '#title#: #optimistic# - #mostLikely# - #pessimistic# -> #expectedTime#';

  private get activities(): ActivityInterface[] {
    return this.useActivitiesStore.activities;
  }

  private activityString(activity: ActivityInterface): string {
    let activityString = this.template;

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
