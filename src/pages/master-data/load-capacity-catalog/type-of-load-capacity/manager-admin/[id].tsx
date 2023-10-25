import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import ManagerTypeOfLoadCapacity from '@/components/menu-item/master-data/load-capacity-catalog/type-of-load-capacity/manager';

function ManagerTypeOfLoadCapacityPage() {
  return (
    <>
      <Head>
        <title>ASL | MANAGER LOAD CAPACITY TYPE</title>
      </Head>
      <ManagerTypeOfLoadCapacity />
    </>
  );
}

export default withAuthentication(ManagerTypeOfLoadCapacityPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'typeOfLoadCapacity']);
export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};
