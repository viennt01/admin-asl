import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditTypeFee from '@/components/menu-item/master-data/fee-catalog/type-fee/edit';

function TypeFeeEditPage() {
  return (
    <>
      <Head>
        <title>ASL | TYPE FEE EDIT</title>
      </Head>
      <EditTypeFee />
    </>
  );
}

export default withAuthentication(TypeFeeEditPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'type-fee']);
export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};
