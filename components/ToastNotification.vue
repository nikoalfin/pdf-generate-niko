<template>
  <div class="fixed top-4 right-4 z-50 space-y-2 pointer-events-none">
    <transition-group name="toast" tag="div">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        :class="[
          'px-4 py-3 rounded shadow-lg text-sm font-semibold pointer-events-auto animate-pulse',
          toast.type === 'success' && 'bg-green-500 text-white',
          toast.type === 'error' && 'bg-red-500 text-white',
          toast.type === 'info' && 'bg-blue-500 text-white',
        ]"
      >
        {{ toast.message }}
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { useToast } from '~/composables/useToast';

const { toasts } = useToast();
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
