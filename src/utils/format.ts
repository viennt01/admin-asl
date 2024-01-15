import dayjs from 'dayjs';

export const formatDateTime = (date: Date) => {
  return dayjs(date).format('YYYY-MM-DD');
};

export function formatDate(
  value: dayjs.ConfigType,
  formatString = 'YYYY-MM-DD HH:MM'
) {
  if (value) {
    return dayjs(value).format(formatString);
  } else {
    return '-';
  }
}

export function formatDateMMDD(
  value: dayjs.ConfigType,
  formatString = 'MM-DD'
) {
  if (value) {
    return dayjs(value).format(formatString);
  } else {
    return '-';
  }
}

export function formatDateYYYYMMDD(
  value: dayjs.ConfigType,
  formatString = 'YYYY-MM-DD'
) {
  if (value) {
    return dayjs(value).format(formatString);
  } else {
    return '-';
  }
}

export const formatNumber = (value: number | string) => {
  if (!value) {
    return '-';
  }
  return new Intl.NumberFormat().format(Number(value));
};

export const getClientTimezone = () => {
  const offset = new Date().getTimezoneOffset();
  const sign = offset < 0 ? '+' : '-';
  const hours = ('00' + Math.floor(Math.abs(offset) / 60)).slice(-2);
  return sign + hours;
};

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'narrowSymbol',
  }).format(amount);
}

export function formatCurrencyHasCurrency(input: string): string {
  if (!input) {
    return '-';
  }
  const parts = input.split(' ');
  if (parts.length !== 2) {
    return '-';
  }
  const amount = parseFloat(parts[0]);
  if (isNaN(amount)) {
    return '-';
  }
  return `${amount}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ` ${parts[1]}`;
}

export function calculateElapsedTime(eventTimestamp: number) {
  const currentTimestamp = Date.now();
  const elapsedMilliseconds = currentTimestamp - eventTimestamp;

  // Chuyển đổi thời gian thành giờ, phút, giây, miligiây
  const seconds = Math.floor(elapsedMilliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 7) {
    // Nếu ngày lớn hơn 7, trả về ngày tháng của eventTimestamp
    return formatDateYYYYMMDD(eventTimestamp);
  } else if (days > 0 && hours > 24) {
    // Nếu ngày nhỏ hơn 7 và số giờ lớn hơn 24, trả về số ngày
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else if (hours > 0 && minutes > 60) {
    // Nếu số giờ nhỏ hơn 24 và số phút lớn hơn 60, trả về số giờ
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (minutes > 0) {
    // Nếu số phút nhỏ hơn 60, trả về số phút
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else {
    // Nếu dưới 1 phút, trả về số giây
    return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
  }
}
