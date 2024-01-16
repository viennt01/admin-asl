import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import ManagerSaleActivity from '@/components/menu-item/sale-activity/manager';

function ManagerSaleActivityPage() {
  return (
    <>
      <Head>
        <title>ASL | MANAGER SALE ACTIViTY</title>
      </Head>
      <ManagerSaleActivity />
    </>
  );
}

export default withAuthentication(ManagerSaleActivityPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'saleActivity']);
export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};
