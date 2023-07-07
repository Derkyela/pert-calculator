<template>
  <Transition
    enter-from-class="opacity-0"
    enter-active-class="transition easy-out"
    enter-to-class="opacity-100"
    leave-from-class="opacity-100"
    leave-active-class="transition easy-in "
    leave-to-class="opacity-0"
  >
    <div
      v-if="show"
      class="duration-100"
    >
      <div
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 flex flex-col drac-bg-black-secondary rounded-lg z-20"
      >
        <slot name="header">
          <div>
            <h3 class="text-lg p-4">
              Default Header
            </h3>
            <hr class="drac-divider drac-border-white">
          </div>
        </slot>
        <slot name="body">
          <div class="p-4 flex-grow">
            Default body
          </div>
        </slot>
        <slot name="footer">
          <div>
            <hr class="drac-divider drac-border-white">
            <div class="p-4 flex justify-between items-center">
              <p>Default footer</p>
              <button
                type="button"
                class="drac-btn drac-border-red drac-btn-outline drac-text-red"
                title="Close modal"
                @click="$emit('close')"
              >
                Close
              </button>
            </div>
          </div>
        </slot>
      </div>
      <div
        class="absolute top-0 left-0 w-full h-full z-10 opacity-70 bg-gray-900 cursor-pointer"
        @click="$emit('close');"
      />
    </div>
  </Transition>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  show: boolean,
}>(), {show: false});

defineEmits<{ (e: 'close'): void, }>();
</script>
