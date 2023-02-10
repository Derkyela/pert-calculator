<template>
  <ul class="drac-list drac-list-unordered drac-my-sm" v-if="showUnorderedList">
    <li v-for="activity in activities" :key="activity.id">{{ activityString(activity) }}</li>
    <li>{{ totalString }}</li>
  </ul>
  <ol class="drac-list drac-list-ordered drac-my-sm" v-if="showOrderedList">
    <li v-for="activity in activities" :key="activity.id">{{ activityString(activity) }}</li>
    <li>{{ totalString }}</li>
  </ol>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { ListType } from '@/interfaces/Settings';
import { ActivityInterface } from '@/interfaces/Activity';
import { Total } from '@/interfaces/Total';

@Options({
  props: {
    activities: {
      type: Array,
      required: true,
    },
    listType: {
      type: String,
      required: true,
    },
    template: {
      type: String,
      required: true,
    },
    total: {
      type: Object,
      required: true,
    },
  },
})
export default class Result extends Vue {
  private listType!: ListType;

  private template!: string;

  private total!: Total;

  private get showUnorderedList(): boolean {
    return this.listType === ListType.Unordered;
  }

  private get showOrderedList(): boolean {
    return this.listType === ListType.Ordered;
  }

  private activityString(activity: ActivityInterface): string {
    let activityString = this.template;

    Object.getOwnPropertyNames(activity).forEach((prop) => {
      activityString = activityString.replaceAll(`#${prop}#`, activity[prop as keyof ActivityInterface].toString());
    });

    return activityString;
  }

  private get totalString(): string {
    let totalString = this.template;

    totalString = totalString.replaceAll('#title#', 'Total');

    Object.getOwnPropertyNames(this.total).forEach((prop) => {
      totalString = totalString.replaceAll(`#${prop}#`, this.total[prop as keyof Total].toString());
    });

    totalString = totalString.replaceAll(/#\w*#/g, '');

    return totalString;
  }
}
</script>
