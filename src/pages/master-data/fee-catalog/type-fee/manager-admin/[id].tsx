import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import ManagerTypeFee from '@/components/menu-item/master-data/fee-catalog/type-fee/manager';

function TypeFeeManagerPage() {
  return (
    <>
      <Head>
        <title>ASL | TYPE FEE MANAGER</title>
      </Head>
      <ManagerTypeFee />
    </>
  );
}

export default withAuthentication(TypeFeeManagerPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'type-fee']);
export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};
