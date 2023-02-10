<template>
  <div v-if="canShow">
    <Component :is="settings.resultType"
               :template="settings.template"
               :list-type="settings.listType"
               :activities="activities"
               :total="total"
    />
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
import { Total } from '@/interfaces/Total';

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

  private get total(): Total {
    return this.useActivitiesStore.total;
  }

  private get canShow(): boolean {
    return this.total.expectedTime > 0;
  }
}
</script>
