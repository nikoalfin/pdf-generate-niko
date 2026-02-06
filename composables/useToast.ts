import { ref } from 'vue';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
  duration: number;
}

const toasts = ref<Toast[]>([]);

export const useToast = () => {
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info', duration: number = 3000) => {
    const id = Date.now().toString();
    const toast: Toast = {
      id,
      message,
      type,
      duration,
    };

    toasts.value.push(toast);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }

    return id;
  };

  const removeToast = (id: string) => {
    toasts.value = toasts.value.filter((t) => t.id !== id);
  };

  const success = (message: string, duration?: number) => {
    return showToast(message, 'success', duration);
  };

  const error = (message: string, duration?: number) => {
    return showToast(message, 'error', duration);
  };

  const info = (message: string, duration?: number) => {
    return showToast(message, 'info', duration);
  };

  return {
    toasts,
    showToast,
    removeToast,
    success,
    error,
    info,
  };
};
