import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import TypeFeeGroupFormManger from '@/components/menu-item/master-data/fee-catalog/type-fee-group/manager';

function FeeManagerPage() {
  return (
    <>
      <Head>
        <title>ASL | TYPE OF FEE GROUP MANAGER</title>
      </Head>
      <TypeFeeGroupFormManger />
    </>
  );
}

export default withAuthentication(FeeManagerPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'fee']);
export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};
