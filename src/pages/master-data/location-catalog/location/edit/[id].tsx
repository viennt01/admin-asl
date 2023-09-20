import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditLocation from '@/components/location-page/edit';

function LocationEditPage() {
  return (
    <>
      <Head>
        <title>ASL | EDIT LOCATION</title>
      </Head>
      <EditLocation />
    </>
  );
}

export default withAuthentication(LocationEditPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'location']);
export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};
