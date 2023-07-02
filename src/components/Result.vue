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
    <div class="relative inline-flex flex-col gap-2 mt-8">
      <CopyNotification>
        <div
          v-if="showFeedback && copySuccess === true"
          class="inline-block drac-bg-black border drac-border-green drac-rounded-lg p-2"
        >
          <span class="text-xs drac-text drac-line-height drac-text-white">Copied</span>
        </div>
      </CopyNotification>
      <CopyNotification>
        <div
          v-if="showFeedback && copySuccess === false"
          class="inline-block drac-bg-black border drac-border-red drac-rounded-lg p-2"
        >
          <span class="text-xs drac-text drac-line-height drac-text-red">Something went wrong copying.</span>
        </div>
      </CopyNotification>
      <button
        type="button"
        class="drac-btn drac-border-green drac-btn-outline drac-text-green"
        @click="copyResult()"
        @blur="copySuccess = null; showFeedback = false;"
      >
        Copy result to clipboard
      </button>
    </div>
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
import CopyNotification from "@/components/Notification/CopyTransition.vue";

const result = ref<typeof Table | typeof List | null>(null);

const showFeedback = ref(false);

const copySuccess = ref<boolean | null>(null);

const activitiesStore = useActivitiesStore();

const settingsStore = useSettingsStore();

const activities = computed(() => activitiesStore.activities);

const settings = computed(() => settingsStore.settings);

const total = computed(() => activitiesStore.total);

const canShow = computed(() => total.value.expectedTime > 0);

function copyResult() {
  showFeedback.value = true;

  if (result.value) {
    try {
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
      copySuccess.value = true;
    } catch (e) {
      copySuccess.value = false;
      console.error(e);
    }
  } else {
    copySuccess.value = false;
  }
}
</script>
