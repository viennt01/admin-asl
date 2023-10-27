import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditLoadCapacity from '@/components/menu-item/master-data/load-capacity-catalog/load-capacity/edit';

function EditLoadCapacityPage() {
  return (
    <>
      <Head>
        <title>ASL | EDIT LOAD CAPACITY</title>
      </Head>
      <EditLoadCapacity />
    </>
  );
}

export default withAuthentication(EditLoadCapacityPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'loadCapacity']);
export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};
