<template>
  <header class="bg-white sticky top-0 z-10 shadow-sm border-b-[2px] border-sky-500">
    <div class="w-full px-4 sm:px-8 py-1">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center gap-3">
          <img src="/assets/images/logo-pdf.png" alt="Report Gen" class="h-20 sm:h-24 w-auto" />
        </div>

        <!-- Desktop Auth Buttons (hidden on mobile) -->
        <div class="hidden md:flex items-center gap-3">
          <button class="px-6 py-2 text-sm font-semibold text-white bg-sky-500 hover:bg-sky-600 rounded-lg transition">Get Started</button>
          <button class="w-10 h-10 rounded-full bg-gray-300 hover:bg-gray-400 transition flex items-center justify-center text-white font-semibold">👤</button>
        </div>

        <!-- Mobile Hamburger Menu (visible on mobile only) -->
        <button @click="toggleMenu" class="md:hidden p-2 rounded-lg hover:bg-gray-100 transition">
          <svg v-if="!isMenuOpen" class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu Dropdown -->
      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="transform opacity-0 -translate-y-2"
        enter-to-class="transform opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="transform opacity-100 translate-y-0"
        leave-to-class="transform opacity-0 -translate-y-2"
      >
        <div v-if="isMenuOpen" class="md:hidden py-4 border-t border-gray-200 mt-2">
          <div class="flex flex-col gap-3">
            <button class="w-full px-6 py-2.5 text-sm font-semibold text-white bg-sky-500 hover:bg-sky-600 rounded-lg transition text-center">Get Started</button>
            <button class="w-full px-6 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition flex items-center justify-center gap-2">
              <span class="text-lg">👤</span>
              <span>Profile</span>
            </button>
          </div>
        </div>
      </transition>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<style scoped></style>
