import { ref } from 'vue';
import { defineStore } from 'pinia';

export enum NOTIFICATION_STATUSES {
  SUCCESS,
  WARNING,
  ERROR,
}

type NotificationState = {
  text: string;
  status: NOTIFICATION_STATUSES;
} | null;

const notificationInitialState = null;

const useNotificationStore = defineStore('notification', () => {
  const notification = ref<NotificationState>(notificationInitialState);

  let timeout: NodeJS.Timeout | null = null;

  function _addNotification({
    text,
    status,
  }: {
    text: string;
    status: NOTIFICATION_STATUSES;
  }): void {
    notification.value = { text, status };

    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      _clearNotification();
      timeout = null;
    }, 5000);
  }

  function _clearNotification(): void {
    notification.value = null;
  }

  const notify: { success: (text: string) => void } = {
    success(text: string): void {
      _addNotification({ text, status: NOTIFICATION_STATUSES.SUCCESS });
    },
  };

  return { notification, notify };
});

export { useNotificationStore, type NotificationState };