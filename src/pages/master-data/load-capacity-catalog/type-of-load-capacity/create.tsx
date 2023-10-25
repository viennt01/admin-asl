import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import CreateLoadCapacityType from '@/components/menu-item/master-data/load-capacity-catalog/type-of-load-capacity/create';

function CreateLoadCapacityTypePage() {
  return (
    <>
      <Head>
        <title>ASL | CREATE LOAD CAPACITY TYPE</title>
      </Head>
      <CreateLoadCapacityType />
    </>
  );
}

export default withAuthentication(CreateLoadCapacityTypePage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'typeOfLoadCapacity']);
