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
export const getStaticProps = getStatic(['common', 'typeOfLocation']);
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
