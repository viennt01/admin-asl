import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditPort from '@/components/port-page/port-edit';

function PortEditPage() {
  return (
    <>
      <Head>
        <title>GLS | Port Edit</title>
      </Head>
      <EditPort />
    </>
  );
}

export default withAuthentication(PortEditPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'port']);
export async function getStaticPaths() {
  return {
    paths: [`/master-data/port/edit/[id]`, { params: { id: '0' } }],
    fallback: false,
  };
}
