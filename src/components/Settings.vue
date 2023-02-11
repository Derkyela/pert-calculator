<template>
  <div class="drac-box drac-d-flex flex-col gap-sm drac-my-sm">
    <label for="resultType" class="drac-d-flex items-center gap-sm">
      <span>Result Type</span>
      <div style="position: relative">
        <select id="resultType" class="drac-select drac-select-white"
                v-model="settings.resultType">
          <option v-for="Type in resultTypeOptions" :key="Type">{{ Type }}</option>
        </select>
        <div class="drac-select-arrow drac-text-white">
          <svg viewBox="0 0 24 24"
               focusable="false"
               role="presentation"
               aria-hidden="true"
          >
            <path fill="currentColor" d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
          </svg>
        </div>
      </div>
    </label>
    <label for="listType"
           class="drac-d-flex items-center gap-sm"
           v-if="resultTypeIsList"
    >
      <span>List Type</span>
      <div style="position: relative">
        <select id="listType" class="drac-select drac-select-white"
                v-model="settings.listType">
          <option v-for="Type in listTypeOptions" :key="Type">{{ Type }}</option>
        </select>
        <div class="drac-select-arrow drac-text-white">
          <svg viewBox="0 0 24 24"
               focusable="false"
               role="presentation"
               aria-hidden="true"
          >
            <path fill="currentColor" d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
          </svg>
        </div>
      </div>
    </label>
    <div v-if="resultTypeIsList">
      <label for="template"
             class="drac-d-flex items-center gap-sm"
      >
        <span>Template</span>
        <input id="template"
               v-model="settings.template"
               class="drac-input drac-input-white drac-text-white"
        />
      </label>
      <div class="drac-text drac-text-grey drac-my-xxs">
        Available template variable: {{ availableTemplateVariables }}
      </div>
    </div>
    <label for="markHighStandardDeviationOfTime"
           class="drac-d-flex items-center gap-sm"
    >
      <span>Mark Hight Standard Deviation of Time</span>
      <input id="markHighStandardDeviationOfTime"
             type="checkbox"
             v-model="settings.markHighStandardDeviationOfTime"
             class="drac-switch drac-checkbox"
             :class="[{
               'drac-switch-green': settings.markHighStandardDeviationOfTime,
               'drac-switch-red': !settings.markHighStandardDeviationOfTime
             }]"
      />
    </label>
    <label for="standardDeviationOfTimeThreshold"
           class="drac-d-flex items-center gap-sm"
           v-if="settings.markHighStandardDeviationOfTime"
    >
      <span>Standard Deviation of Time Threshold</span>
      <div class="drac-w-xxs">
        <input id="standardDeviationOfTimeThreshold"
               :value="settings.standardDeviationOfTimeThreshold"
               @input="settings.standardDeviationOfTimeThreshold = toNumber($event.target.value)"
               @focus="$event.target.select()"
               class="drac-input drac-input-white drac-text-white"
        />
      </div>
    </label>
    <div>
      <label for="storeSettings"
             class="drac-d-flex items-center gap-sm"
      >
        <span>Store Settings</span>
        <input id="storeSettings"
               type="checkbox"
               v-model="settings.storeSettings"
               class="drac-switch drac-checkbox"
               :class="[{
               'drac-switch-green': settings.storeSettings,
               'drac-switch-red': !settings.storeSettings
             }]"
        />
      </label>
      <div class="drac-text drac-text-grey drac-my-xxs">
        Settings are stored in local storage and removed if you disable the feature again.
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import useSettingsStore from '@/stores/settings';
import { ListType, ResultType, SettingsInterface } from '@/interfaces/Settings';
import { toNumber } from '@/utils';

@Options({
  methods: { toNumber },
  emits: [
    'set:standardDeviationOfTimeThreshold',
  ],
})
export default class Settings extends Vue {
  private useSettingsStore = useSettingsStore();

  private get settings(): SettingsInterface {
    return this.useSettingsStore.settings;
  }

  // eslint-disable-next-line class-methods-use-this
  private get resultTypeOptions(): string[] {
    return Object.values(ResultType);
  }

  // eslint-disable-next-line class-methods-use-this
  private get listTypeOptions(): string[] {
    return Object.values(ListType);
  }

  private get resultTypeIsList(): boolean {
    return this.settings.resultType === ResultType.List;
  }

  // eslint-disable-next-line class-methods-use-this
  private get availableTemplateVariables(): string {
    const variables = [
      '#title#',
      '#optimistic#',
      '#mostLikely#',
      '#pessimistic#',
      '#expectedTime#',
      '#standardDeviationOfTime#',
    ];

    return variables.join(', ');
  }

  mounted() {
    this.useSettingsStore.$subscribe((mutation, state) => {
      if (state.settings.storeSettings) {
        localStorage.setItem('settings', JSON.stringify(state));
      } else {
        localStorage.removeItem('settings');
      }
    });
  }
}
</script>

<style>
.flex-col {
  flex-direction: column;
}

.items-center {
  align-items: center;
}

.gap-sm {
  gap: var(--spacing-sm);
}
</style>
