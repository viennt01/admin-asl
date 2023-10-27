import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import LoadCapacity from '@/components/menu-item/master-data/load-capacity-catalog/load-capacity';

function LoadCapacityPage() {
  return (
    <>
      <Head>
        <title>ASL | LOAD CAPACITY</title>
      </Head>
      <LoadCapacity />
    </>
  );
}

export default withAuthentication(LoadCapacityPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'loadCapacity']);
