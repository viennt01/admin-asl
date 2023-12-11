import { useRouter } from 'next/router';
import enUS from 'antd/lib/locale/en_US';
import vi_VN from 'antd/lib/locale/vi_VN';
import { useEffect, useState } from 'react';

export enum LANGUAGE {
  'VN' = 'VN',
  'EN' = 'EN',
}

export const LANGUAGES = ['VN', 'EN'];

export function useLocale(): LANGUAGE {
  const router = useRouter();
  return (router.locale as LANGUAGE) || LANGUAGE.EN;
}

export function useLocaleAnt() {
  const [localeApp, setLocaleApp] = useState(enUS);
  const locale = useLocale();
  useEffect(() => {
    switch (locale) {
      case 'EN':
        setLocaleApp(enUS);
        break;
      case 'VN':
        setLocaleApp(vi_VN);
        break;
      default:
        setLocaleApp(enUS);
        break;
    }
  }, [locale]);
  return localeApp;
}

export const DAY_WEEK = [
  {
    value: '2',
    label: 'Monday',
  },
  {
    value: '3',
    label: 'Tuesday',
  },
  {
    value: '4',
    label: 'Wednesday',
  },
  {
    value: '5',
    label: 'Thursday',
  },
  {
    value: '6',
    label: 'Friday',
  },
  {
    value: '7',
    label: 'Saturday',
  },
  {
    value: '8',
    label: 'Sunday',
  },
];
