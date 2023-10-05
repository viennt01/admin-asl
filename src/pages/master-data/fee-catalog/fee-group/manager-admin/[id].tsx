import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import FeeGroupManger from '@/components/menu-item/master-data/fee-catalog/fee-group/manager';

function FeeManagerPage() {
  return (
    <>
      <Head>
        <title>ASL | FEE GROUP MANAGER</title>
      </Head>
      <FeeGroupManger />
    </>
  );
}

export default withAuthentication(FeeManagerPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'feeGroup']);
export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};
