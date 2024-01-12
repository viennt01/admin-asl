import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import CreateTypeSaleActivity from '@/components/menu-item/master-data/sale-activity/type-sale-activity/create';

function CreateDeclarationPage() {
  return (
    <>
      <Head>
        <title>ASL | CREATE SALE ACTIVITY TYPE</title>
      </Head>
      <CreateTypeSaleActivity />
    </>
  );
}

export default withAuthentication(CreateDeclarationPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'typeOfSaleActivity']);
