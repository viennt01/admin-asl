import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditBank from '@/components/bank-page/bank-edit';

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
export const getStaticProps = getStatic(['common', 'bank']);
export const getStaticPaths = async ({ locales }: { locales: [] }) => {
  const ids: string[] = [];
  const paths = ids.map(() =>
    locales.map(() => ({
      params: {},
    }))
  );
  return {
    paths,
    fallback: true,
  };
};
