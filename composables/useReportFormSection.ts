import { computed, ref } from 'vue';
import { useReportForm } from '~/composables/useReportForm';
import { useToast } from '~/composables/useToast';

type SubmitEmit = (event: 'submit', judul: string, pageSize: string, deskripsi: string, nominal: number) => void;

export const useReportFormSection = (emit: SubmitEmit) => {
  const { formData, nominalInput, errors, handleNominalInput, validateField, validateAllFields, isFormValid: checkFormValid, resetForm } = useReportForm();
  const { error } = useToast();

  const pageSizeOptions = ['A4', 'A5', 'Letter'];
  const isPageSizeOpen = ref(false);
  const selectedPageSizeLabel = computed(() => formData.value.pageSize);

  const isFormValid = computed(() => checkFormValid());

  const handleNominalAndValidate = (e: Event) => {
    handleNominalInput(e);
    validateField('nominal');
  };

  const togglePageSize = () => {
    isPageSizeOpen.value = !isPageSizeOpen.value;
  };

  const closePageSize = () => {
    isPageSizeOpen.value = false;
  };

  const selectPageSize = (value: string) => {
    formData.value.pageSize = value;
    validateField('pageSize');
    closePageSize();
  };

  const onSubmit = async () => {
    if (!validateAllFields()) {
      error('Mohon lengkapi dan perbaiki semua field yang tertera');
      return;
    }

    try {
      emit('submit', formData.value.judul, formData.value.pageSize, formData.value.deskripsi, formData.value.nominal);
      resetForm();
    } catch (err) {
      error('❌ Terjadi kesalahan saat generate PDF');
    }
  };

  return {
    formData,
    nominalInput,
    errors,
    validateField,
    pageSizeOptions,
    isPageSizeOpen,
    selectedPageSizeLabel,
    isFormValid,
    handleNominalAndValidate,
    togglePageSize,
    closePageSize,
    selectPageSize,
    onSubmit,
  };
};
