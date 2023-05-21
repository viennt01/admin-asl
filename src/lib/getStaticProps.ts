import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// eslint-disable-next-line no-unused-vars
export const getStatic: (fileName: string[]) => GetStaticProps =
  (fileName: string[]) =>
  async ({ locale }) => ({
    props: {
      ...(await serverSideTranslations(locale as string, fileName)),
    },
  });
