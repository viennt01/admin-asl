import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import ManagerUnit from '@/components/unit-page/unit-manager';

function UnitManagerPage() {
  return (
    <>
      <Head>
        <title>ASL | UNIT MANAGER</title>
      </Head>
      <ManagerUnit />
    </>
  );
}

export default withAuthentication(UnitManagerPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'unit']);
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
