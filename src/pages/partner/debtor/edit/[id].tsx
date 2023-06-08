import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditDebtor from '@/components/debtor-page/debtor-edit';

function DebtorEditPage() {
  return (
    <>
      <Head>
        <title>GLS | LOCATION Edit</title>
      </Head>
      <EditDebtor />
    </>
  );
}

export default withAuthentication(DebtorEditPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'debtor']);
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
