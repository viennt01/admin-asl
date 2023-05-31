import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditLocationType from '@/components/type-of-location-page/type-of-location-edit';

function CustomerEditPage() {
  return (
    <>
      <Head>
        <title>GLS | Location Type Edit</title>
      </Head>
      <EditLocationType />
    </>
  );
}

export default withAuthentication(CustomerEditPage);
// import { getStatic } from '@/lib/getStaticProps';
// export const getStaticProps = getStatic(['common', 'type-of-expenses']);
// export async function getStaticPaths() {
//   return {
//     paths: [`/master-data/type-of-expenses/edit/[id]`, { params: { id: '0' } }],
//     fallback: false,
//   };
// }
