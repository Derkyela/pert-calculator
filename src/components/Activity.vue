<template>
  <div class="flex flex-col border rounded-lg drac-border-grey p-2
              lg:border-0 lg:p-0 lg:grid lg:grid-cols-12 gap-4">
    <div class="col-span-5 ">
      <label :for="`title_${activityId}`" class="lg:hidden">Title</label>
      <input type="text"
             :id="`title_${activityId}`"
             :value="title"
             :placeholder="titlePlaceholder"
             @input="emit('update:title', $event.target.value);"
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
             @input="emit('update:optimistic', toNumber($event.target.value));
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
             @input="emit('update:mostLikely', toNumber($event.target.value));
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
             @input="emit('update:pessimistic', toNumber($event.target.value));
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
            @click="emit('removeActivity', activityId)"
            v-if="canDelete"
            class="col-start-12 drac-btn drac-bg-red drac-text-black"
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
} from 'vue';
import type { TypeActivityEvents } from '@/types';

const STEP = 0.5;

const props = defineProps({
  activityId: {
    type: Number,
    default: 1,
  },
  title: {
    type: String,
    default: '',
  },
  optimistic: {
    type: Number,
    default: 0,
  },
  mostLikely: {
    type: Number,
    default: 0,
  },
  pessimistic: {
    type: Number,
    default: 0,
  },
  expectedTime: {
    type: Number,
    default: 0,
  },
  standardDeviationOfTime: {
    type: Number,
    default: 0,
  },
  canDelete: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits([
  'removeActivity',
  'update:title',
  'update:optimistic',
  'update:mostLikely',
  'update:pessimistic',
  'update:expectedTime',
  'update:standardDeviationOfTime',
]);

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

function updateCalculatedValues(): void {
  calcExpectedTime();
  calcStandardDeviationOfTime();
}

function increment(event: Event, emitName: TypeActivityEvents): void {
  const element = event.target as HTMLInputElement;

  emit(emitName, toNumber(element.value) + STEP);
  nextTick(() => calcExpectedTime());
}

function decrement(event: Event, emitName: TypeActivityEvents): void {
  const element = event.target as HTMLInputElement;

  emit(emitName, toNumber(element.value) - STEP);
  nextTick(() => calcExpectedTime());
}

const markHighStandardDeviationOfTime = computed(() => {
  if (!settings.value.markHighStandardDeviationOfTime || !props.standardDeviationOfTime) {
    return false;
  }

  return props.standardDeviationOfTime > settings.value.standardDeviationOfTimeThreshold;
});
</script>
