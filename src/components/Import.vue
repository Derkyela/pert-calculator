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
          <File @import-success="handleSuccess" />
          <Clipboard
            @import-success="handleSuccess"
            @import-failure="handleFailure"
          />
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
  <Message
    v-for="(message, index) in messages"
    :key="message.symbol"
    :message="message.message"
    :type="message.type"
    @close="removeMessage(index)"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Modal from '@/components/Modal.vue';
import File from '@/components/Import/File.vue';
import Clipboard from '@/components/Import/Clipboard.vue';
import { set } from '@vueuse/core';
import { MessageType } from '@/interfaces/NotificationMessage';
import Message from '@/components/Notification/Message.vue';

const showImportModal = ref(false);

const messages = ref<Array<{ message: string, type: MessageType, symbol: symbol }>>([]);

function handleSuccess(warnings: Array<string> = []): void {
  warnings.forEach((message) => messages.value.push({message: message, type: MessageType.WARNING, symbol: Symbol(message)}));
  const successMessage = 'Successfully imported activities.';
  const message = {message: successMessage, type: MessageType.SUCCESS, symbol: Symbol(successMessage)};
  messages.value.push(message);
  set(showImportModal, false);
}

function handleFailure(errors: Array<string>): void {
  errors.forEach((error) => messages.value.push({message: error, type: MessageType.ERROR, symbol: Symbol(error)}));
  set(showImportModal, false);
}

function removeMessage(index: number) {
  messages.value.splice(index, 1);
}
</script>
