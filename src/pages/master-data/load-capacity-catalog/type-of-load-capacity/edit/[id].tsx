import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditLoadCapacityType from '@/components/menu-item/master-data/load-capacity-catalog/type-of-load-capacity/edit';

function EditTypeOfLoadCapacityPage() {
  return (
    <>
      <Head>
        <title>ASL | EDIT LOAD CAPACITY TYPE</title>
      </Head>
      <EditLoadCapacityType />
    </>
  );
}

export default withAuthentication(EditTypeOfLoadCapacityPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'typeOfLoadCapacity']);
export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};
