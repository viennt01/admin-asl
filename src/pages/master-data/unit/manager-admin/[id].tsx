import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';

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
import ManagerUnit from '@/components/request-for-approval-page/components/unit-type/unit-manager';
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
