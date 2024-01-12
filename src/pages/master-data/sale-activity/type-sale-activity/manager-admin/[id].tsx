import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import ManagerTypeSaleActivity from '@/components/menu-item/master-data/sale-activity/type-sale-activity/manager';

function DeclarationManagerPage() {
  return (
    <>
      <Head>
        <title>ASL | MANAGER SALE ACTIVITY TYPE</title>
      </Head>
      <ManagerTypeSaleActivity />
    </>
  );
}

export default withAuthentication(DeclarationManagerPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'typeOfSaleActivity']);
export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};
