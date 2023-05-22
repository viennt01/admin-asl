import { useTranslation } from 'next-i18next';

export default function useI18n(fileName?: string) {
  const {
    t: translate,
    ready,
    i18n,
  } = useTranslation<string, string>(fileName);
  return {
    translate: (name: string) => translate<string>(name),
    i18n,
    ready,
  };
}
