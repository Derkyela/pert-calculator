<template>
  <button
    type="button"
    class="drac-btn drac-border-green drac-btn-outline drac-text-green"
    @click="showImportModal = true"
  >
    Import Activities
  </button>
  <Teleport to="body">
    <Modal
      :show="showImportModal"
      @close="showImportModal = false"
    >
      <template #header>
        <h3 class="text-lg p-6">
          How would you like to import?
        </h3>
      </template>
      <template #body>
        <div class="p-6 self-center flex-grow flex gap-4">
          <File @import-success="showImportModal = false" />
        </div>
      </template>
      <template #footer>
        <div class="p-6 flex justify-end">
          <button
            type="button"
            class="drac-btn drac-border-red drac-btn-outline drac-text-red"
            title="Close modal"
            @click="showImportModal = false"
          >
            Close
          </button>
        </div>
      </template>
    </Modal>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Modal from "@/components/Modal.vue";
import File from "@/components/Import/File.vue";

const showImportModal = ref(false);
</script>
