import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditPort from '@/components/port-page/port-edit';

function PortEditPage() {
  return (
    <>
      <Head>
        <title>ASL | PORT EDIT</title>
      </Head>
      <EditPort />
    </>
  );
}

export default withAuthentication(PortEditPage);
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
