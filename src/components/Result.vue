<template>
  <div v-if="canShow">
    <Component
      :is="settings.resultType"
      ref="result"
      :template="settings.template"
      :list-type="settings.listType"
      :activities="activities"
      :total="total"
    />
    <button
      type="button"
      class="drac-btn drac-border-green drac-btn-outline drac-text-green mt-8"
      @click="copyResult()"
    >
      Copy result to clipboard
    </button>
  </div>
  <p v-else>
    Please add an activity first.
  </p>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import useActivitiesStore from '@/stores/activities';
import useSettingsStore from '@/stores/settings';
import type Table from "@/components/Result/Table.vue";
import type List from "@/components/Result/List.vue";

const result = ref<typeof Table | typeof List | null>(null);

const activitiesStore = useActivitiesStore();

const settingsStore = useSettingsStore();

const activities = computed(() => activitiesStore.activities);

const settings = computed(() => settingsStore.settings);

const total = computed(() => activitiesStore.total);

const canShow = computed(() => total.value.expectedTime > 0);

function copyResult() {
  if (result.value) {
    const clipboardItem = new ClipboardItem({
      'text/plain': new Blob(
        [result.value.html.innerText],
        {type: 'text/plain'},
      ),
      'text/html': new Blob(
        [result.value.html.outerHTML],
        {type: 'text/html'},
      ),
    });

    navigator.clipboard.write([clipboardItem]);
  }
}
</script>
