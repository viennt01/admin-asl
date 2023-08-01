import { useRouter } from 'next/router';
import enUS from 'antd/lib/locale/en_US';
import vi_VN from 'antd/lib/locale/vi_VN';
import { useEffect, useState } from 'react';

export enum LANGUAGE {
  'VN' = 'VN',
  'EN' = 'EN',
}

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
