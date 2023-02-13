<template>
  <div class="drac-box flex flex-col gap-4 my-4">
    <div class="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-4">
      <label for="resultType">Result Type</label>
      <div class="relative">
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
    </div>
    <div v-if="resultTypeIsList" class="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-4">
      <label for="listType">List Type</label>
      <div class="relative">
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
    </div>
    <div v-if="resultTypeIsList">
      <div class="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-4">
        <label for="template">Template</label>
        <input id="template"
               v-model="settings.template"
               class="flex-shrink drac-input drac-input-white drac-text-white"
        />
      </div>
      <div class="drac-text drac-text-grey my-1.5">
        Available template variable: {{ availableTemplateVariables }}
      </div>
    </div>
    <div class="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-4">
      <label for="markHighStandardDeviationOfTime">Mark Hight Standard Deviation of Time</label>
      <input id="markHighStandardDeviationOfTime"
             type="checkbox"
             v-model="settings.markHighStandardDeviationOfTime"
             class="drac-switch drac-checkbox"
             :class="[{
               'drac-switch-green': settings.markHighStandardDeviationOfTime,
               'drac-switch-red': !settings.markHighStandardDeviationOfTime
             }]"
      />
    </div>
    <div v-if="settings.markHighStandardDeviationOfTime"
         class="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-4"
    >
      <label for="standardDeviationOfTimeThreshold">Standard Deviation of Time Threshold</label>
      <div class="lg:w-28">
        <input id="standardDeviationOfTimeThreshold"
               :value="settings.standardDeviationOfTimeThreshold"
               @input="settings.standardDeviationOfTimeThreshold = toNumber($event.target.value)"
               @focus="$event.target.select()"
               class="drac-input drac-input-white drac-text-white"
        />
      </div>
    </div>
    <div>
      <div class="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-4">
        <label for="storeSettings">Store Settings</label>
        <input id="storeSettings"
               type="checkbox"
               v-model="settings.storeSettings"
               class="drac-switch drac-checkbox"
               :class="[{
               'drac-switch-green': settings.storeSettings,
               'drac-switch-red': !settings.storeSettings
             }]"
        />
      </div>
      <div class="drac-text drac-text-grey my-1.5">
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
