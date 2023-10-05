import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import ManagerLocationType from '@/components/menu-item/master-data/location-catalog/type-of-location/manager';

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
