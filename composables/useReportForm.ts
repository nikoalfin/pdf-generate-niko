import { ref } from 'vue';

export interface FormData {
  pageSize: string;
  judul: string;
  deskripsi: string;
  nominal: number;
}

export interface FormErrors {
  pageSize: string;
  judul: string;
  deskripsi: string;
  nominal: string;
}

export const useReportForm = () => {
  // Form State
  const formData = ref<FormData>({
    pageSize: 'A4',
    judul: '',
    deskripsi: '',
    nominal: 0,
  });

  const nominalInput = ref('');
  const isLoading = ref(false);

  // Validation State
  const errors = ref<FormErrors>({
    pageSize: '',
    judul: '',
    deskripsi: '',
    nominal: '',
  });

  // Handle Nominal Input (Format currency dengan separator ribuan)
  const handleNominalInput = (e: Event) => {
    const inputElement = e.target as HTMLInputElement;
    let input = inputElement.value;

    // Hapus semua karakter non-digit
    const numbers = input.replace(/\D/g, '');

    // Update form data dengan value numerik
    formData.value.nominal = parseInt(numbers) || 0;

    // Format display dengan separator ribuan (dot notation Rupiah)
    nominalInput.value = formData.value.nominal.toLocaleString('id-ID');

    // Pindahkan cursor ke akhir input
    setTimeout(() => {
      inputElement.setSelectionRange(inputElement.value.length, inputElement.value.length);
    }, 0);
  };

  // Validate Field
  const validateField = (field: string) => {
    errors.value[field as keyof FormErrors] = '';

    switch (field) {
      case 'pageSize':
        if (!formData.value.pageSize) {
          errors.value.pageSize = 'Ukuran halaman harus dipilih';
        }
        break;
      case 'judul':
        if (!formData.value.judul.trim()) {
          errors.value.judul = 'Judul laporan harus diisi';
        } else if (formData.value.judul.trim().length < 5) {
          errors.value.judul = 'Judul minimal 5 karakter';
        }
        break;
      case 'deskripsi':
        if (!formData.value.deskripsi.trim()) {
          errors.value.deskripsi = 'Deskripsi harus diisi';
        } else if (formData.value.deskripsi.trim().length < 10) {
          errors.value.deskripsi = 'Deskripsi minimal 10 karakter';
        }
        break;
      case 'nominal':
        if (formData.value.nominal < 0) {
          errors.value.nominal = 'Nominal harus berupa angka positif';
        } else if (!nominalInput.value || formData.value.nominal === 0) {
          errors.value.nominal = 'Nominal harus diisi';
        }
        break;
    }
  };

  // Validate All Fields
  const validateAllFields = () => {
    validateField('pageSize');
    validateField('judul');
    validateField('deskripsi');
    validateField('nominal');

    return !Object.values(errors.value).some((error) => error !== '');
  };

  // Check Form Valid (tanpa update error state, hanya check apakah form siap submit)
  const isFormValid = () => {
    // Check pageSize
    if (!formData.value.pageSize) return false;

    // Check judul
    const judulTrimmed = formData.value.judul.trim();
    if (!judulTrimmed || judulTrimmed.length < 5) return false;

    // Check deskripsi
    const deskripsiTrimmed = formData.value.deskripsi.trim();
    if (!deskripsiTrimmed || deskripsiTrimmed.length < 10) return false;

    // Check nominal
    if (formData.value.nominal <= 0) return false;

    return true;
  };

  // Reset Form
  const resetForm = () => {
    formData.value = {
      pageSize: 'A4',
      judul: '',
      deskripsi: '',
      nominal: 0,
    };
    nominalInput.value = '';
    errors.value = {
      pageSize: '',
      judul: '',
      deskripsi: '',
      nominal: '',
    };
  };

  return {
    formData,
    nominalInput,
    isLoading,
    errors,
    handleNominalInput,
    validateField,
    validateAllFields,
    isFormValid,
    resetForm,
  };
};
