<template>
  <div v-if="canShow">
    <Component :is="settings.resultType"
               :template="settings.template"
               :list-type="settings.listType"
               :activities="activities"/>
  </div>
  <p v-else>Please add an activity first.</p>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import useActivitiesStore from '@/stores/activities';
import useSettingsStore from '@/stores/settings';
import { ActivityInterface } from '@/interfaces/Activity';
import { SettingsInterface } from '@/interfaces/Settings';
import List from '@/components/Result/List.vue';
import Table from '@/components/Result/Table.vue';

@Options({
  components: {
    List,
    Table,
  },
})
export default class Result extends Vue {
  private useActivitiesStore = useActivitiesStore();

  private useSettingsStore = useSettingsStore();

  private get activities(): ActivityInterface[] {
    return this.useActivitiesStore.activities;
  }

  private get settings(): SettingsInterface {
    return this.useSettingsStore.settings;
  }

  get canShow(): boolean {
    return this.useActivitiesStore.total.expectedTime > 0;
  }
}
</script>
