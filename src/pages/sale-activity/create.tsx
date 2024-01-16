import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import CreateSaleActivity from '@/components/menu-item/sale-activity/create';

function CreateSaleActivityPage() {
  return (
    <>
      <Head>
        <title>ASL | CREATE SALE ACTIViTY</title>
      </Head>
      <CreateSaleActivity />
    </>
  );
}

export default withAuthentication(CreateSaleActivityPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'saleActivity']);
