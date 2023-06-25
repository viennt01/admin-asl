import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditUnit from '@/components/unit-page/unit-edit';

function UnitEditPage() {
  return (
    <>
      <Head>
        <title>ASL | UNIT EDIT</title>
      </Head>
      <EditUnit />
    </>
  );
}

export default withAuthentication(UnitEditPage);
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
