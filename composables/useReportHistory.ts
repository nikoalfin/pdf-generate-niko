import { onMounted, ref, watch } from 'vue';

export interface HistoryRow {
  judul: string;
  pageSize: string;
  nominal: string;
  tanggal: string;
  deskripsi: string;
}

const STORAGE_KEY = 'report_history_v1';
const rows = ref<HistoryRow[]>([]);
let isHydrated = false;
let isWatching = false;

export const useReportHistory = () => {
  const loadHistory = () => {
    if (typeof window === 'undefined') return;

    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return;

    try {
      const parsed = JSON.parse(stored) as HistoryRow[];
      if (Array.isArray(parsed)) {
        rows.value = parsed.map((row) => ({
          judul: row.judul,
          pageSize: row.pageSize,
          nominal: row.nominal,
          tanggal: row.tanggal,
          deskripsi: row.deskripsi || '',
        }));
      }
    } catch {
      // Ignore corrupted storage values
    }
  };

  const saveHistory = () => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rows.value));
  };

  // Format Currency
  const formatCurrency = (value: number): string => {
    return `Rp ${value.toLocaleString('id-ID')}`;
  };

  // Format Date
  const formatDate = (date: Date): string => {
    const day = date.getDate();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  // Add to History
  const addToHistory = (judul: string, pageSize: string, deskripsi: string, nominal: number) => {
    rows.value.unshift({
      judul,
      pageSize,
      nominal: formatCurrency(nominal),
      tanggal: formatDate(new Date()),
      deskripsi,
    });
    saveHistory();
  };

  // Delete Row
  const deleteRow = (index: number) => {
    rows.value.splice(index, 1);
    saveHistory();
  };

  const initStorage = () => {
    if (isHydrated) return;
    loadHistory();
    isHydrated = true;
  };

  const initWatcher = () => {
    if (isWatching) return;
    watch(
      rows,
      () => {
        saveHistory();
      },
      { deep: true },
    );
    isWatching = true;
  };

  onMounted(() => {
    initStorage();
    initWatcher();
  });

  // Get Size Color Class
  const sizeColor = (size: string): string => {
    const colors: Record<string, string> = {
      A4: 'bg-blue-100 text-blue-800',
      A5: 'bg-green-100 text-green-800',
      Letter: 'bg-purple-100 text-purple-800',
    };
    return colors[size] || 'bg-gray-100 text-gray-800';
  };

  return {
    rows,
    formatCurrency,
    formatDate,
    addToHistory,
    deleteRow,
    sizeColor,
  };
};
