<template>
  <input type="text"
         v-model="title"
         :placeholder="titlePlaceholder"
         aria-label="Activity Title"
  />
  <input type="number"
         min="0"
         step=".5"
         v-model="optimisticInput"
         aria-label="Optimistic time"
  />
  <input type="number"
         step=".5"
         v-model="mostLikelyInput"
         aria-label="Most likely time"
  />
  <input type="number"
         step=".5"
         v-model="pessimisticInput"
         aria-label="Pessimistic time"
  />
  <div>{{ expectedTime }}</div>
  <div>{{ standardDeviationOfTime }}</div>
  <button type="button"
          @click="$emit('removeActivity', id)"
          v-if="canDelete"
  >
    Remove
  </button>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
// eslint-disable-next-line import/no-unresolved,import/extensions
import round from '../utils';

@Options({
  emits: [
    'removeActivity',
  ],
  props: {
    canDelete: Boolean,
    modelValue: {
      id: Number,
      optimistic: Number,
      mostLikely: Number,
      pessimistic: Number,
      expectedTime: Number,
    },
  },
  computed: {
    expectedTime: Number,
    standardDeviationOfTime: Number,
    titlePlaceholder: String,
  },
})
export default class Activity extends Vue {
  id!: number;

  title = '';

  modelValue!: {
    id: number,
    optimistic: number,
    mostLikely: number,
    pessimistic: number,
    expectedTime: number,
  };

  canDelete!: boolean;

  private get optimisticInput(): number {
    return this.modelValue.optimistic;
  }

  private set optimisticInput(val: number) {
    this.$emit('update:modelValue', {
      id: this.modelValue.id,
      optimistic: val,
      mostLikely: this.modelValue.mostLikely,
      pessimistic: this.modelValue.pessimistic,
      expectedTime: Activity.calcExpectedTime(
        val,
        this.modelValue.mostLikely,
        this.modelValue.pessimistic,
      ),
    });
  }

  private get mostLikelyInput(): number {
    return this.modelValue.mostLikely;
  }

  private set mostLikelyInput(val: number) {
    this.$emit('update:modelValue', {
      id: this.modelValue.id,
      optimistic: this.modelValue.optimistic,
      mostLikely: val,
      pessimistic: this.modelValue.pessimistic,
      expectedTime: Activity.calcExpectedTime(
        this.modelValue.optimistic,
        val,
        this.modelValue.pessimistic,
      ),
    });
  }

  private get pessimisticInput(): number {
    return this.modelValue.pessimistic;
  }

  private set pessimisticInput(val: number) {
    this.$emit('update:modelValue', {
      id: this.modelValue.id,
      optimistic: this.modelValue.optimistic,
      mostLikely: this.modelValue.mostLikely,
      pessimistic: val,
      expectedTime: Activity.calcExpectedTime(
        this.modelValue.optimistic,
        this.modelValue.mostLikely,
        val,
      ),
    });
  }

  private get expectedTime(): number {
    return Activity.calcExpectedTime(
      this.optimisticInput,
      this.mostLikelyInput,
      this.pessimisticInput,
    );
  }

  private static calcExpectedTime(
    optimistic: number,
    mostLikely: number,
    pessimistic: number,
  ): number {
    const expectedTime = (optimistic + 4 * mostLikely + pessimistic) / 6;

    return round(expectedTime);
  }

  get standardDeviationOfTime(): number {
    const standardDeviationOfTime = (this.modelValue.pessimistic - this.modelValue.optimistic) / 6;

    return round(standardDeviationOfTime);
  }

  get titlePlaceholder(): string {
    return `Activity ${this.modelValue.id}`;
  }
}
</script>
