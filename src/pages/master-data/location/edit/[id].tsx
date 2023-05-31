import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditLocation from '@/components/location-page/location-edit';

function LocationEditPage() {
  return (
    <>
      <Head>
        <title>GLS | LOCATION Edit</title>
      </Head>
      <EditLocation />
    </>
  );
}

export default withAuthentication(LocationEditPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'location']);
export async function getStaticPaths() {
  return {
    paths: [`/master-data/location/edit/[id]`, { params: { id: '0' } }],
    fallback: false,
  };
}
