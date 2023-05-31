import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditLocationType from '@/components/type-of-location-page/type-of-location-edit';

function TypeOfLocationEditPage() {
  return (
    <>
      <Head>
        <title>GLS | Location Type Edit</title>
      </Head>
      <EditLocationType />
    </>
  );
}

export default withAuthentication(TypeOfLocationEditPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'type-of-location']);
export async function getStaticPaths() {
  return {
    paths: [`/master-data/type-of-location/edit/[id]`, { params: { id: '0' } }],
    fallback: false,
  };
}
