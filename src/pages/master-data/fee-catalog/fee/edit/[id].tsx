import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';

function FeeEditPage() {
  return (
    <>
      <Head>
        <title>ASL | FEE EDIT</title>
      </Head>
      <EditFee />
    </>
  );
}

export default withAuthentication(FeeEditPage);
import { getStatic } from '@/lib/getStaticProps';
import EditFee from '@/components/menu-item/master-data/fee-catalog/fee/edit';
export const getStaticProps = getStatic(['common', 'fee']);
export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};
