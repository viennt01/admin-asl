import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import TypeOfLoadCapacity from '@/components/menu-item/master-data/load-capacity-catalog/type-of-load-capacity';

function TypeOfLoadCapacityPage() {
  return (
    <>
      <Head>
        <title>ASL | TYPE OF LOAD CAPACITY</title>
      </Head>
      <TypeOfLoadCapacity />
    </>
  );
}

export default withAuthentication(TypeOfLoadCapacityPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'typeOfLoadCapacity']);
