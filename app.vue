<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Toast Notification -->
    <ToastNotification />

    <!-- Header Component -->
    <ReportHeader />

    <!-- Main Content -->
    <main class="w-full px-8 py-6">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <!-- Form Section (Left) -->
          <div class="lg:col-span-2">
            <ReportFormSection :is-loading="isLoading" @submit="handleFormSubmit" />
          </div>

          <!-- Table Section (Right) -->
          <div class="lg:col-span-3">
            <ReportTableSection ref="tableRef" />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ToastNotification from '~/components/ToastNotification.vue';
import ReportHeader from '~/components/ReportHeader.vue';
import ReportFormSection from '~/components/ReportFormSection.vue';
import ReportTableSection from '~/components/ReportTableSection.vue';
import { useReportHistory } from '~/composables/useReportHistory';
import { useToast } from '~/composables/useToast';

const isLoading = ref(false);
const tableRef = ref<InstanceType<typeof ReportTableSection>>();
const { addToHistory } = useReportHistory();
const { success, error } = useToast();

/**
 * Handle form submission
 * Receives data from ReportFormSection component
 */
const handleFormSubmit = async (judul: string, pageSize: string, deskripsi: string, nominal: number) => {
  isLoading.value = true;

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Add to history
    addToHistory(judul, pageSize, deskripsi, nominal);

    success('✅ PDF berhasil di-generate!');
    console.log('PDF generated successfully', { judul, pageSize, deskripsi, nominal });
  } catch (err) {
    error('❌ Terjadi kesalahan saat generate PDF');
    console.error('Error generating PDF:', err);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped></style>
