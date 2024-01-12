import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditTypeSaleActivity from '@/components/menu-item/master-data/sale-activity/type-sale-activity/edit';

function TypeOfDeclarationEditPage() {
  return (
    <>
      <Head>
        <title>ASL | EDIT SALE ACTIVITY TYPE </title>
      </Head>
      <EditTypeSaleActivity />
    </>
  );
}

export default withAuthentication(TypeOfDeclarationEditPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'typeOfSaleActivity']);
export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};
