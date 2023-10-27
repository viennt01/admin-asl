import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import ManagerLoadCapacity from '@/components/menu-item/master-data/load-capacity-catalog/load-capacity/manager';

function ManagerLoadCapacityPage() {
  return (
    <>
      <Head>
        <title>ASL | MANAGER LOAD CAPACITY</title>
      </Head>
      <ManagerLoadCapacity />
    </>
  );
}

export default withAuthentication(ManagerLoadCapacityPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'loadCapacity']);
export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};
