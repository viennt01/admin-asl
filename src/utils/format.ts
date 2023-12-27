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
