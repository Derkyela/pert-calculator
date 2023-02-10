<template>
  <table class="drac-table">
    <thead>
    <tr>
      <th>Activity Title</th>
      <th>Optimistic Time</th>
      <th>Most Likely Time</th>
      <th>Pessimistic Time</th>
      <th>Expected Time</th>
      <th>Standard Deviation of Time</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="activity in activities" :key="activity.id">
      <td>{{ activity.title }}</td>
      <td>{{ activity.optimistic }}</td>
      <td>{{ activity.mostLikely }}</td>
      <td>{{ activity.pessimistic }}</td>
      <td>{{ activity.expectedTime }}</td>
      <td>{{ activity.standardDeviationOfTime }}</td>
    </tr>
    </tbody>
    <tfoot>
    <tr>
      <th>Total</th>
      <th class="drac-px-xs">{{ total.optimistic }}</th>
      <th class="drac-px-xs">{{ total.mostLikely }}</th>
      <th class="drac-px-xs">{{ total.pessimistic }}</th>
      <th class="drac-px-xs">{{ total.expectedTime }}</th>
    </tr>
    </tfoot>
  </table>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    activities: {
      type: Array,
      required: true,
    },
    total: {
      type: Array,
      required: true,
    },
  },
})
export default class Result extends Vue {
}
</script>
