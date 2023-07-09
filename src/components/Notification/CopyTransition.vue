<template>
  <Transition
    class="absolute left-1/2 transform -translate-x-1/2 -translate-y-[calc(100%+.5rem)] transition-all"
    enter-from-class="translate-y-0 opacity-0"
    enter-active-class="transition easy-out duration-100"
    enter-to-class="opacity-100"
    leave-from-class="opacity-100"
    leave-active-class="transition easy-in duration-500"
    leave-to-class="opacity-0"
  >
    <slot />
  </Transition>
</template>
