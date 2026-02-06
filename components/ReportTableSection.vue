<template>
  <section class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <div class="flex items-center justify-between mb-5 border-b pb-3">
      <h3 class="text-xs font-bold text-black uppercase tracking-widest">Daftar History Generate</h3>
    </div>

    <div v-if="rows.length === 0" class="text-center py-8">
      <p class="text-sm text-gray-600">Belum ada history. Generate PDF untuk melihat history</p>
    </div>

    <div v-else class="overflow-x-auto">
      <table class="w-full text-xs">
        <thead>
          <tr class="bg-gray-50 border-b border-gray-200">
            <th class="px-3 py-2 text-left font-semibold text-gray-700">No</th>
            <th class="px-3 py-2 text-left font-semibold text-gray-700">Judul</th>
            <th class="px-3 py-2 text-left font-semibold text-gray-700">Page Size</th>
            <th class="px-3 py-2 text-left font-semibold text-gray-700">Nominal</th>
            <th class="px-3 py-2 text-left font-semibold text-gray-700">Tanggal</th>
            <th class="px-3 py-2 text-center font-semibold text-gray-700">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="(row, index) in rows" :key="index" class="hover:bg-gray-50 transition">
            <td class="px-3 py-2.5 text-gray-900">{{ index + 1 }}</td>
            <td class="px-3 py-2.5 text-gray-900">{{ row.judul }}</td>
            <td class="px-3 py-2.5">
              <span class="inline-block px-2 py-1 rounded text-xs font-semibold" :class="sizeColor(row.pageSize)">
                {{ row.pageSize }}
              </span>
            </td>
            <td class="px-3 py-2.5 text-gray-900">{{ row.nominal }}</td>
            <td class="px-3 py-2.5 text-gray-700">{{ row.tanggal }}</td>
            <td class="px-3 py-2.5">
              <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-1">
                <button @click="openDetail(row)" class="px-2 py-1 bg-blue-100 text-blue-600 font-semibold rounded hover:bg-blue-200 transition text-xs whitespace-nowrap">View</button>
                <button @click="openDelete(index, row)" class="px-2 py-1 bg-red-100 text-red-600 font-semibold rounded hover:bg-red-200 transition text-xs whitespace-nowrap">Delete</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Detail Modal -->
    <div v-if="isDetailOpen" class="fixed inset-0 z-40 flex items-center justify-center bg-black/40 p-4" @click.self="closeDetail">
      <div class="w-full max-w-lg bg-white rounded-xl shadow-xl border border-gray-200 p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
        <div class="flex items-start justify-between mb-4 gap-2">
          <div class="flex-1 min-w-0">
            <p class="text-xs font-semibold text-gray-500 uppercase tracking-widest">Detail Laporan</p>
            <h4 class="text-base sm:text-lg font-bold text-gray-900 break-words">{{ selectedRow?.judul }}</h4>
          </div>
          <button @click="closeDetail" class="text-gray-400 hover:text-gray-600 flex-shrink-0 text-xl leading-none">✕</button>
        </div>

        <div class="space-y-3 text-sm">
          <div class="flex items-center justify-between gap-4">
            <span class="text-gray-500 flex-shrink-0">Page Size</span>
            <span class="font-semibold text-gray-900 text-right">{{ selectedRow?.pageSize }}</span>
          </div>
          <div class="flex items-center justify-between gap-4">
            <span class="text-gray-500 flex-shrink-0">Nominal</span>
            <span class="font-semibold text-gray-900 text-right break-all">{{ selectedRow?.nominal }}</span>
          </div>
          <div class="flex items-center justify-between gap-4">
            <span class="text-gray-500 flex-shrink-0">Tanggal</span>
            <span class="font-semibold text-gray-900 text-right">{{ selectedRow?.tanggal }}</span>
          </div>
          <div>
            <span class="text-gray-500">Deskripsi</span>
            <p class="mt-2 text-gray-900 bg-gray-50 border border-gray-200 rounded-lg p-3 min-h-[80px] break-words">
              {{ selectedRow?.deskripsi || '-' }}
            </p>
          </div>
        </div>

        <div class="mt-5 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2">
          <button @click="closeDetail" class="px-3 py-2 text-xs font-semibold rounded border border-gray-300 text-gray-700 hover:bg-gray-50">Tutup</button>
          <button @click="downloadPdf" class="px-3 py-2 text-xs font-semibold rounded bg-sky-500 text-white hover:bg-sky-600">Download PDF</button>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="isDeleteOpen" class="fixed inset-0 z-40 flex items-center justify-center bg-black/40 p-4" @click.self="closeDelete">
      <div class="w-full max-w-sm bg-white rounded-xl shadow-xl border border-gray-200 p-4 sm:p-6">
        <h4 class="text-base font-bold text-gray-900">Konfirmasi Hapus</h4>
        <p class="text-sm text-gray-600 mt-2 break-words">
          Yakin ingin menghapus data <span class="font-semibold">{{ selectedRow?.judul }}</span
          >?
        </p>

        <div class="mt-5 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2">
          <button @click="closeDelete" class="px-3 py-2 text-xs font-semibold rounded border border-gray-300 text-gray-700 hover:bg-gray-50">Batal</button>
          <button @click="confirmDelete" class="px-3 py-2 text-xs font-semibold rounded bg-red-500 text-white hover:bg-red-600">Hapus</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useReportTableSection } from '~/composables/useReportTableSection';

const { rows, sizeColor, isDetailOpen, isDeleteOpen, selectedRow, selectedIndex, openDetail, closeDetail, openDelete, closeDelete, confirmDelete, downloadPdf } = useReportTableSection();

defineExpose({
  rows,
});
</script>

<style scoped></style>
