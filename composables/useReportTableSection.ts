import { ref } from 'vue';
import { useReportHistory, type HistoryRow } from '~/composables/useReportHistory';

export const useReportTableSection = () => {
  const { rows, sizeColor, deleteRow } = useReportHistory();

  const isDetailOpen = ref(false);
  const isDeleteOpen = ref(false);
  const selectedRow = ref<HistoryRow | null>(null);
  const selectedIndex = ref<number | null>(null);

  const openDetail = (row: HistoryRow) => {
    selectedRow.value = row;
    isDetailOpen.value = true;
  };

  const closeDetail = () => {
    isDetailOpen.value = false;
  };

  const openDelete = (index: number, row: HistoryRow) => {
    selectedIndex.value = index;
    selectedRow.value = row;
    isDeleteOpen.value = true;
  };

  const closeDelete = () => {
    isDeleteOpen.value = false;
  };

  const confirmDelete = () => {
    if (selectedIndex.value === null) return;
    deleteRow(selectedIndex.value);
    isDeleteOpen.value = false;
  };

  const downloadPdf = async () => {
    if (!selectedRow.value || typeof window === 'undefined') return;

    const { jsPDF } = await import('jspdf');

    const safeTitle = (selectedRow.value.judul || 'report')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const formatMap: Record<string, string> = {
      A4: 'a4',
      A5: 'a5',
      Letter: 'letter',
    };

    const format = formatMap[selectedRow.value.pageSize] || 'a4';
    const doc = new jsPDF({ format, unit: 'pt' });

    const margin = 40;
    const pageWidth = doc.internal.pageSize.getWidth();
    let y = 60;

    doc.setFontSize(16);
    doc.text('Report Detail', margin, y);
    y += 24;

    doc.setFontSize(12);
    const metaLines = [`Judul: ${selectedRow.value.judul}`, `Page Size: ${selectedRow.value.pageSize}`, `Nominal: ${selectedRow.value.nominal}`, `Tanggal: ${selectedRow.value.tanggal}`];

    metaLines.forEach((line) => {
      doc.text(line, margin, y);
      y += 18;
    });

    y += 6;
    doc.text('Deskripsi:', margin, y);
    y += 18;

    const description = selectedRow.value.deskripsi || '-';
    const descLines = doc.splitTextToSize(description, pageWidth - margin * 2);
    doc.text(descLines, margin, y);

    doc.save(`${safeTitle || 'report'}.pdf`);
  };

  return {
    rows,
    sizeColor,
    isDetailOpen,
    isDeleteOpen,
    selectedRow,
    selectedIndex,
    openDetail,
    closeDetail,
    openDelete,
    closeDelete,
    confirmDelete,
    downloadPdf,
  };
};
