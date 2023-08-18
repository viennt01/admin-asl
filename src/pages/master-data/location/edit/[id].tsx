import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditLocation from '@/components/location-page/edit-location';

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
export const getStaticProps = getStatic(['common', 'port']);

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
