import { notification } from 'antd';

notification.config({
  placement: 'topRight',
  duration: 3,
  maxCount: 5,
});

type NotificationType = 'success' | 'info' | 'warning' | 'error';

const COLOR_TYPE = {
  success: '#f6ffed',
  info: '#e6f7ff',
  warning: '#fffbe6',
  error: '#fff2f0',
};

const openNotificationWithIcon = (type: NotificationType, message: string) => {
  notification[type]({
    message: message,
    style: {
      padding: 12,
      background: COLOR_TYPE[type],
    },
  });
};

export const infoToast = (message: string) =>
  openNotificationWithIcon('info', message);
export const warningToast = (message: string) =>
  openNotificationWithIcon('warning', message);
export const successToast = (message: string) =>
  openNotificationWithIcon('success', message);
export const errorToast = (message: string) =>
  openNotificationWithIcon('error', message);
