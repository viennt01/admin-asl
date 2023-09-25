import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';

function FeeManagerPage() {
  return (
    <>
      <Head>
        <title>ASL | FEE MANAGER</title>
      </Head>
      <ManagerFee />
    </>
  );
}

export default withAuthentication(FeeManagerPage);
import { getStatic } from '@/lib/getStaticProps';
import ManagerFee from '@/components/fee-page/manager';
export const getStaticProps = getStatic(['common', 'fee']);
export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};
