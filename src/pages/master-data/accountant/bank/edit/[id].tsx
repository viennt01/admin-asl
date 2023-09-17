import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditBank from '@/components/bank-page/edit';

function BankEditPage() {
  return (
    <>
      <Head>
        <title>ASL | BANK EDIT</title>
      </Head>
      <EditBank />
    </>
  );
}

export default withAuthentication(BankEditPage);
import { getStatic } from '@/lib/getStaticProps';
import { LANGUAGES } from '@/constant';
export const getStaticProps = getStatic(['common', 'bank']);
export const getStaticPaths = () => {
  return {
    paths: LANGUAGES.map((locale: string) => {
      return {
        params: { id: '' },
        locale: locale,
      };
    }),
    fallback: true,
  };
};
