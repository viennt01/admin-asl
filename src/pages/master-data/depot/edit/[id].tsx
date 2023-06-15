import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditDepot from '@/components/depot-page/depot-edit';

function DepotEditPage() {
  return (
    <>
      <Head>
        <title>GLS | DEPOT EDIT</title>
      </Head>
      <EditDepot />
    </>
  );
}

export default withAuthentication(DepotEditPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'depot']);

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
