import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const getStatic: (fileName: string[]) => GetStaticProps =
  (fileName: string[]) =>
  async ({ locale }) => ({
    props: {
      ...(await serverSideTranslations(locale as string, fileName)),
    },
  });
