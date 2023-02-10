<template>
  <input type="text"
         :value="title"
         :placeholder="titlePlaceholder"
         @input="$emit('update:title', $event.target.value);"
         @focus="$event.target.select()"
         aria-label="Activity Title"
         class="col-span-5 drac-input drac-input-white drac-text-white"
  />
  <input :value="optimistic"
         @input="$emit('update:optimistic', toNumber($event.target.value));
          $nextTick(() => updateCalculatedValues())"
         @focus="$event.target.select()"
         @keydown.up="increment($event, 'update:optimistic')"
         @keydown.down="decrement($event, 'update:optimistic')"
         aria-label="Optimistic time"
         class="drac-input drac-input-white drac-text-white"
  />
  <input :value="mostLikely"
         @input="$emit('update:mostLikely', toNumber($event.target.value));
          $nextTick(() => updateCalculatedValues())"
         @focus="$event.target.select()"
         @keydown.up="increment($event, 'update:mostLikely')"
         @keydown.down="decrement($event, 'update:mostLikely')"
         aria-label="Most likely time"
         class="drac-input drac-input-white drac-text-white"
  />
  <input :value="pessimistic"
         @input="$emit('update:pessimistic', toNumber($event.target.value));
          $nextTick(() => updateCalculatedValues())"
         @focus="$event.target.select()"
         @keydown.up="increment($event, 'update:pessimistic')"
         @keydown.down="decrement($event, 'update:pessimistic')"
         aria-label="Pessimistic time"
         class="drac-input drac-input-white drac-text-white"
  />
  <div class="drac-py-xs drac-text-white drac-text-semibold drac-text-right">
    {{ expectedTime }}
  </div>
  <div class="col-span-2 drac-py-xs drac-text-white drac-text-right">
    {{ standardDeviationOfTime }}
  </div>
  <button type="button"
          @click="$emit('removeActivity', activityId)"
          v-if="canDelete"
          class="col-start-12 drac-btn drac-bg-red"
  >
    Remove
  </button>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
// eslint-disable-next-line import/no-unresolved,import/extensions
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
}
</script>

<style>
.col-start-12 {
  grid-column-start: 12;
}
</style>
