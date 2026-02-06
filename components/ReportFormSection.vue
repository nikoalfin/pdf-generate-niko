<template>
  <section class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <h3 class="text-xs font-bold text-black uppercase tracking-widest mb-5 border-b pb-3">Form Section</h3>

    <form @submit.prevent="onSubmit" class="space-y-4">
      <!-- 2.1 Page Size Dropdown -->
      <div class="relative">
        <label class="block text-xs font-semibold text-gray-700 mb-1">
          Ukuran Halaman
          <span class="text-red-500">*</span>
        </label>
        <button
          type="button"
          :class="[
            'w-full px-3 py-2 border rounded text-sm bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 flex items-center justify-between',
            errors.pageSize ? 'border-red-500 ring-2 ring-red-200' : 'border-gray-300',
          ]"
          @click="togglePageSize"
          aria-label="Ukuran Halaman"
        >
          <span class="truncate text-gray-900">
            {{ selectedPageSizeLabel || '-- Pilih ukuran --' }}
          </span>
          <span class="text-gray-400">▾</span>
        </button>
        <div v-if="isPageSizeOpen" class="fixed inset-0 z-30" @click="closePageSize"></div>
        <div v-if="isPageSizeOpen" class="absolute z-40 mt-1 w-full rounded border border-gray-200 bg-white shadow-lg">
          <ul class="max-h-48 overflow-auto text-sm">
            <li>
              <button type="button" class="w-full px-3 py-2 text-left hover:bg-sky-50" @click="selectPageSize('')">-- Pilih ukuran --</button>
            </li>
            <li v-for="option in pageSizeOptions" :key="option" class="border-t border-gray-100">
              <button type="button" class="w-full px-3 py-2 text-left hover:bg-sky-50" @click="selectPageSize(option)">
                {{ option }}
              </button>
            </li>
          </ul>
        </div>
        <p v-if="errors.pageSize" class="text-xs text-red-600 mt-1">{{ errors.pageSize }}</p>
      </div>

      <!-- 2.2 Text Input - Judul Laporan -->
      <div>
        <label class="block text-xs font-semibold text-gray-700 mb-1">
          Judul Laporan
          <span class="text-red-500">*</span>
        </label>
        <input
          v-model="formData.judul"
          type="text"
          placeholder="Masukkan judul laporan..."
          maxlength="100"
          :class="['w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-sky-500', errors.judul ? 'border-red-500 ring-2 ring-red-200' : 'border-gray-300']"
          @input="validateField('judul')"
          @blur="validateField('judul')"
          aria-label="Judul Laporan"
        />
        <div class="flex justify-between items-center mt-1">
          <p v-if="errors.judul" class="text-xs text-red-600">{{ errors.judul }}</p>
          <span class="text-xs text-gray-500 ml-auto">{{ formData.judul.length }}/100 karakter</span>
        </div>
      </div>

      <!-- 2.3 Textarea - Deskripsi/Isi Laporan -->
      <div>
        <label class="block text-xs font-semibold text-gray-700 mb-1">
          Deskripsi / Isi Laporan
          <span class="text-red-500">*</span>
        </label>
        <textarea
          v-model="formData.deskripsi"
          rows="4"
          placeholder="Masukkan isi laporan di sini..."
          maxlength="1000"
          :class="['w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none', errors.deskripsi ? 'border-red-500 ring-2 ring-red-200' : 'border-gray-300']"
          @input="validateField('deskripsi')"
          @blur="validateField('deskripsi')"
          aria-label="Deskripsi Isi Laporan"
        ></textarea>
        <div class="flex justify-between items-center mt-1">
          <p v-if="errors.deskripsi" class="text-xs text-red-600">{{ errors.deskripsi }}</p>
          <span class="text-xs text-gray-500 ml-auto">{{ formData.deskripsi.length }}/1000 karakter</span>
        </div>
      </div>

      <!-- 2.4 Currency Input - Nominal -->
      <div>
        <label class="block text-xs font-semibold text-gray-700 mb-1">
          Nominal (Rp)
          <span class="text-red-500">*</span>
        </label>
        <div class="relative">
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 font-medium text-sm">Rp</span>
          <input
            v-model="nominalInput"
            type="text"
            placeholder="0"
            inputmode="numeric"
            :class="['w-full pl-10 pr-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-sky-500', errors.nominal ? 'border-red-500 ring-2 ring-red-200' : 'border-gray-300']"
            @input="handleNominalAndValidate"
            @blur="validateField('nominal')"
            aria-label="Nominal dalam Rupiah"
          />
        </div>
        <p v-if="errors.nominal" class="text-xs text-red-600 mt-1">{{ errors.nominal }}</p>
      </div>

      <!-- 3.0 Submit Button - Generate PDF -->
      <button
        type="submit"
        :disabled="!isFormValid || isLoading"
        :class="['w-full mt-6 px-4 py-2.5 text-white text-xs font-bold uppercase tracking-wide rounded transition', isFormValid && !isLoading ? 'bg-sky-500 hover:bg-sky-600 cursor-pointer' : 'bg-gray-400 cursor-not-allowed']"
      >
        <span v-if="isLoading" class="flex items-center justify-center gap-2">
          <span class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          Generating...
        </span>
        <span v-else>📄 Generate PDF</span>
      </button>
    </form>
  </section>
</template>

<script setup lang="ts">
import { useReportFormSection } from '~/composables/useReportFormSection';

interface Props {
  isLoading: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  submit: [judul: string, pageSize: string, deskripsi: string, nominal: number];
}>();

const { formData, nominalInput, errors, validateField, pageSizeOptions, isPageSizeOpen, selectedPageSizeLabel, isFormValid, handleNominalAndValidate, togglePageSize, closePageSize, selectPageSize, onSubmit } = useReportFormSection(emit);
</script>

<style scoped></style>
