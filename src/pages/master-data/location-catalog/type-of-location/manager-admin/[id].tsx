import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import ManagerLocationType from '@/components/type-of-location-page/manager';

function BankManagerPage() {
  return (
    <>
      <Head>
        <title>ASL | LOCATION TYPE MANAGER</title>
      </Head>
      <ManagerLocationType />
    </>
  );
}

export default withAuthentication(BankManagerPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'typeOfLocation']);
export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};
