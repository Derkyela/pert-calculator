<template>
  <div
    class="flex flex-col border rounded-lg drac-border-grey p-2
              lg:border-0 lg:p-0 lg:grid lg:grid-cols-12 gap-4"
  >
    <div class="col-span-5 ">
      <label
        :for="`title_${activityId}`"
        class="lg:hidden"
      >Title</label>
      <input
        :id="`title_${activityId}`"
        type="text"
        :value="title"
        :placeholder="titlePlaceholder"
        aria-label="Activity Title"
        class="drac-input drac-input-white"
        :class="[{
          'drac-text-white': !markHighStandardDeviationOfTime,
          'drac-text-red': markHighStandardDeviationOfTime,
        }]"
        @input="$emit('update:title', ($event.target as HTMLInputElement).value);"
        @focus="($event.target as HTMLInputElement).select()"
      >
    </div>
    <div>
      <label
        :for="`optimistic_${activityId}`"
        class="lg:hidden"
      >Optimistic:</label>
      <input
        :id="`optimistic_${activityId}`"
        :value="optimistic"
        aria-label="Optimistic time"
        class="drac-input drac-input-white"
        :class="[{
          'drac-text-white': !markHighStandardDeviationOfTime,
          'drac-text-red': markHighStandardDeviationOfTime,
        }]"
        @input="emit('update:optimistic', toNumber(($event.target as HTMLInputElement).value));
                recalculate()"
        @focus="($event.target as HTMLInputElement).select()"
        @keydown.up="$emit('update:optimistic', increment($event)); recalculate();"
        @keydown.down="$emit('update:optimistic', decrement($event)); recalculate();"
      >
    </div>
    <div>
      <label
        :for="`mostLikely_${activityId}`"
        class="lg:hidden"
      >Most Likely:</label>
      <input
        :id="`mostLikely_${activityId}`"
        :value="mostLikely"
        aria-label="Most likely time"
        class="drac-input drac-input-white drac-text-white"
        @input="emit('update:mostLikely', toNumber(($event.target as HTMLInputElement).value));
                recalculate()"
        @focus="($event.target as HTMLInputElement).select()"
        @keydown.up="$emit('update:mostLikely', increment($event)); recalculate();"
        @keydown.down="$emit('update:mostLikely', decrement($event)); recalculate();"
      >
    </div>
    <div>
      <label
        :for="`pessimistic_${activityId}`"
        class="lg:hidden"
      >Pessimistic:</label>
      <input
        :id="`pessimistic_${activityId}`"
        :value="pessimistic"
        aria-label="Pessimistic time"
        class="drac-input drac-input-white"
        :class="[{
          'drac-text-white': !markHighStandardDeviationOfTime,
          'drac-text-red': markHighStandardDeviationOfTime,
        }]"
        @input="emit('update:pessimistic', toNumber(($event.target as HTMLInputElement).value));
                recalculate();"
        @focus="($event.target as HTMLInputElement).select()"
        @keydown.up="$emit('update:pessimistic', increment($event)); recalculate();"
        @keydown.down="$emit('update:pessimistic', decrement($event)); recalculate();"
      >
    </div>
    <div class="hidden lg:block py-2 drac-text-white drac-text-semibold drac-text-right">
      {{ expectedTime }}
    </div>
    <div
      class="hidden lg:block col-span-2 py-2 drac-text-right"
      :class="[{
        'drac-text-white': !markHighStandardDeviationOfTime,
        'drac-text-red': markHighStandardDeviationOfTime,
      }]"
    >
      {{ standardDeviationOfTime }}
    </div>
    <button
      v-if="canDelete"
      type="button"
      class="col-start-12 drac-btn drac-bg-red drac-text-black"
      @click="$emit('remove-activity', activityId ?? 1)"
    >
      Remove
    </button>
  </div>
</template>

<script setup lang="ts">
import useSettingsStore from '@/stores/settings';
import { round, toNumber } from '@/utils';
import {
  computed,
  defineEmits,
  defineProps,
  nextTick,
  withDefaults,
} from 'vue';

const STEP = 0.5;

interface Props {
  activityId?: number,
  title?: string,
  optimistic?: number,
  mostLikely?: number,
  pessimistic?: number,
  expectedTime?: number,
  standardDeviationOfTime?: number,
  canDelete?: boolean,
}

const props = withDefaults(defineProps<Props>(), {
  activityId: 1,
  title: '',
  optimistic: 0,
  mostLikely: 0,
  pessimistic: 0,
  expectedTime: 0,
  standardDeviationOfTime: 0,
  canDelete: false,
});

const emit = defineEmits<{
  (e: 'remove-activity', activityId: number): void,
  (e: 'update:title', title: string): void,
  (e: 'update:optimistic', optimistic: number): void,
  (e: 'update:mostLikely', mostLikely: number): void,
  (e: 'update:pessimistic', pessimistic: number): void,
  (e: 'update:expectedTime', expectedTime: number): void,
  (e: 'update:standardDeviationOfTime', standardDeviationOfTime: number): void,
}>();

const settingsStore = useSettingsStore();

const settings = computed(() => settingsStore.settings);
const titlePlaceholder = computed(() => `Activity ${props.activityId}`);

function calcExpectedTime(): void {
  if (props.mostLikely === 0 && props.pessimistic === 0) {
    return;
  }

  const expectedTime = (props.optimistic + 4 * props.mostLikely + props.pessimistic) / 6;
  emit('update:expectedTime', round(expectedTime));
}

function calcStandardDeviationOfTime(): void {
  if (props.pessimistic === 0) {
    return;
  }

  const standardDeviationOfTime = (props.pessimistic - props.optimistic) / 6;
  emit('update:standardDeviationOfTime', round(standardDeviationOfTime));
}

function recalculate(): void {
  nextTick(() => {
    calcExpectedTime();
    calcStandardDeviationOfTime();
  });
}

function increment(event: Event): number {
  const element = event.target as HTMLInputElement;

  return toNumber(element.value) + STEP
}

function decrement(event: Event): number {
  const element = event.target as HTMLInputElement;

  return toNumber(element.value) - STEP;
}

const markHighStandardDeviationOfTime = computed(() => {
  if (!settings.value.markHighStandardDeviationOfTime || !props.standardDeviationOfTime) {
    return false;
  }

  return props.standardDeviationOfTime > settings.value.standardDeviationOfTimeThreshold;
});
</script>
