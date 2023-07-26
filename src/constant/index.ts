import { useRouter } from 'next/router';

export enum LANGUAGE {
  'VN' = 'VN',
  'EN' = 'EN',
}

export default function useLocale(): LANGUAGE {
  const router = useRouter();
  return (router.locale as LANGUAGE) || LANGUAGE.EN;
}
