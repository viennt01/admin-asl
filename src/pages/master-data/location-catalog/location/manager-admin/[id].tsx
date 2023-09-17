import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import ManagerLocation from '@/components/location-page/manager';

function LocationManagerPage() {
  return (
    <>
      <Head>
        <title>ASL | LOCATION MANAGER</title>
      </Head>
      <ManagerLocation />
    </>
  );
}

export default withAuthentication(LocationManagerPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'location']);
export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};
