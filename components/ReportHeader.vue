<template>
  <header class="bg-white sticky top-0 z-10 shadow-sm border-b-[5px] border-sky-500">
    <div class="w-full px-8 py-1">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center gap-3">
          <img src="/assets/images/logo-pdf.png" alt="Report Gen" class="h-24 w-auto" />
        </div>
        <!-- Auth Buttons -->
        <div class="flex items-center gap-3">
          <button class="px-6 py-2 text-sm font-semibold text-white bg-sky-500 hover:bg-sky-600 rounded-lg transition">Get Started</button>
          <button class="w-10 h-10 rounded-full bg-gray-300 hover:bg-gray-400 transition flex items-center justify-center text-white font-semibold">👤</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
// Header component - pure UI, no logic
</script>

<style scoped></style>
