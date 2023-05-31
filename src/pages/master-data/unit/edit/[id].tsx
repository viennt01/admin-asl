import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditUnit from '@/components/unit-page/unit-edit';

function UnitEditPage() {
  return (
    <>
      <Head>
        <title>GLS | Unit Edit</title>
      </Head>
      <EditUnit />
    </>
  );
}

export default withAuthentication(UnitEditPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'unit']);
export async function getStaticPaths() {
  return {
    paths: [`/master-data/unit/edit/[id]`, { params: { id: '0' } }],
    fallback: false,
  };
}
