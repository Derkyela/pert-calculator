<template>
  <Teleport to="#messages">
    <Transition
      enter-from-class="translate-y-[calc(100%_+_1rem)]"
      enter-active-class="transform transition easy-out duration-100"
      enter-to-class="translate-y-0"
      leave-from-class="opacity-100"
      leave-active-class="transition easy-in duration-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="show"
        class="p-4 rounded-lg cursor-pointer z-10"
        :class="{'drac-bg-yellow': type === MessageType.WARNING, 'drac-bg-red': type === MessageType.ERROR, 'drac-bg-green': type === MessageType.SUCCESS}"
        @click="show = false; emit('close')"
        @mouseenter="stopTimer"
        @mouseleave="startTimer"
      >
        <span
          class="drac-text-black"
          v-text="message"
        />
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { MessageType } from '@/interfaces/NotificationMessage';
import { onMounted, ref } from 'vue';
import { get, set } from '@vueuse/core';

defineProps<{
  message: string,
  type: MessageType
}>();

const emit = defineEmits<{ (e: 'close'): void, }>();

const show = ref(false);

const timer = ref<number>();

function stopTimer() {
  clearTimeout(get(timer));
}

function startTimer() {
  set(timer, setTimeout(() => {
    set(show, false);
    emit('close');
  }, 10000));
}

onMounted(() => {
  set(show, true);
  startTimer();
})

</script>
