<template>
  <div class="flex flex-col border rounded-lg drac-border-grey p-2
              lg:border-0 lg:p-0 lg:grid lg:grid-cols-12 gap-4">
    <div class="col-span-5 ">
      <label :for="`title_${activityId}`" class="lg:hidden">Title</label>
      <input type="text"
             :id="`title_${activityId}`"
             :value="title"
             :placeholder="titlePlaceholder"
             @input="$emit('update:title', $event.target.value);"
             @focus="$event.target.select()"
             aria-label="Activity Title"
             class="drac-input drac-input-white"
             :class="[{
           'drac-text-white': !markHighStandardDeviationOfTime,
           'drac-text-red': markHighStandardDeviationOfTime
       }]"
      />
    </div>
    <div>
      <label :for="`optimistic_${activityId}`" class="lg:hidden">Optimistic:</label>
      <input :value="optimistic"
             :id="`optimistic_${activityId}`"
             @input="$emit('update:optimistic', toNumber($event.target.value));
          $nextTick(() => updateCalculatedValues())"
             @focus="$event.target.select()"
             @keydown.up="increment($event, 'update:optimistic')"
             @keydown.down="decrement($event, 'update:optimistic')"
             aria-label="Optimistic time"
             class="drac-input drac-input-white"
             :class="[{
           'drac-text-white': !markHighStandardDeviationOfTime,
           'drac-text-red': markHighStandardDeviationOfTime
       }]"
      />
    </div>
    <div>
      <label :for="`mostLikely_${activityId}`" class="lg:hidden">Most Likely:</label>
      <input :value="mostLikely"
             :id="`mostLikely_${activityId}`"
             @input="$emit('update:mostLikely', toNumber($event.target.value));
          $nextTick(() => updateCalculatedValues())"
             @focus="$event.target.select()"
             @keydown.up="increment($event, 'update:mostLikely')"
             @keydown.down="decrement($event, 'update:mostLikely')"
             aria-label="Most likely time"
             class="drac-input drac-input-white drac-text-white"
      />
    </div>
    <div>
      <label :for="`pessimistic_${activityId}`" class="lg:hidden">Pessimistic:</label>
      <input :value="pessimistic"
             :id="`pessimistic_${activityId}`"
             @input="$emit('update:pessimistic', toNumber($event.target.value));
          $nextTick(() => updateCalculatedValues())"
             @focus="$event.target.select()"
             @keydown.up="increment($event, 'update:pessimistic')"
             @keydown.down="decrement($event, 'update:pessimistic')"
             aria-label="Pessimistic time"
             class="drac-input drac-input-white"
             :class="[{
           'drac-text-white': !markHighStandardDeviationOfTime,
           'drac-text-red': markHighStandardDeviationOfTime
       }]"
      />
    </div>
    <div class="hidden lg:block py-2 drac-text-white drac-text-semibold drac-text-right">
      {{ expectedTime }}
    </div>
    <div class="hidden lg:block col-span-2 py-2 drac-text-right"
         :class="[{
         'drac-text-white': !markHighStandardDeviationOfTime,
         'drac-text-red': markHighStandardDeviationOfTime
       }]"
    >
      {{ standardDeviationOfTime }}
    </div>
    <button type="button"
            @click="$emit('removeActivity', activityId)"
            v-if="canDelete"
            class="col-start-12 drac-btn drac-bg-red drac-text-black"
    >
      Remove
    </button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
// eslint-disable-next-line import/no-unresolved,import/extensions
import useSettingsStore from '@/stores/settings';
import { SettingsInterface } from '@/interfaces/Settings';
import { round, toNumber } from '../utils';

@Options({
  methods: { toNumber },
  emits: [
    'removeActivity',
    'update:title',
    'update:optimistic',
    'update:mostLikely',
    'update:pessimistic',
    'update:expectedTime',
    'update:standardDeviationOfTime',
  ],
  props: {
    activityId: Number,
    title: String,
    optimistic: Number,
    mostLikely: Number,
    pessimistic: Number,
    expectedTime: Number,
    standardDeviationOfTime: Number,
    canDelete: Boolean,
  },
  computed: {
    titlePlaceholder: String,
  },
})
export default class Activity extends Vue {
  private step = 0.5;

  canDelete!: boolean;

  activityId!: number;

  optimistic!: number;

  mostLikely!: number;

  pessimistic!: number;

  standardDeviationOfTime!: number;

  private useSettingsStore = useSettingsStore();

  private get settings(): SettingsInterface {
    return this.useSettingsStore.settings;
  }

  private calcExpectedTime(): void {
    if (this.mostLikely === 0 && this.pessimistic === 0) {
      return;
    }

    const expectedTime = (this.optimistic + 4 * this.mostLikely + this.pessimistic) / 6;
    this.$emit('update:expectedTime', round(expectedTime));
  }

  private updateCalculatedValues(): void {
    this.calcExpectedTime();
    this.calcStandardDeviationOfTime();
  }

  private calcStandardDeviationOfTime(): void {
    if (this.pessimistic === 0) {
      return;
    }

    const standardDeviationOfTime = (this.pessimistic - this.optimistic) / 6;
    this.$emit('update:standardDeviationOfTime', round(standardDeviationOfTime));
  }

  get titlePlaceholder(): string {
    return `Activity ${this.activityId}`;
  }

  private increment(event: Event, emitName: string): void {
    const element = event.target as HTMLInputElement;

    this.$emit(emitName, toNumber(element.value) + this.step);
    this.$nextTick(() => this.calcExpectedTime());
  }

  private decrement(event: Event, emitName: string): void {
    const element = event.target as HTMLInputElement;

    this.$emit(emitName, toNumber(element.value) - this.step);
    this.$nextTick(() => this.calcExpectedTime());
  }

  private get markHighStandardDeviationOfTime(): boolean {
    if (!this.settings.markHighStandardDeviationOfTime) {
      return false;
    }

    return this.standardDeviationOfTime > this.settings.standardDeviationOfTimeThreshold;
  }
}
</script>