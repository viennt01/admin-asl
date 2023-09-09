import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import ManagerLocation from '@/components/location-page/manager';

function BankManagerPage() {
  return (
    <>
      <Head>
        <title>ASL | LOCATION MANAGER</title>
      </Head>
      <ManagerLocation />
    </>
  );
}

export default withAuthentication(BankManagerPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'location']);
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
