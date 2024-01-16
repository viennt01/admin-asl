import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import SaleActivity from '@/components/menu-item/sale-activity';

function SaleActivityPage() {
  return (
    <>
      <Head>
        <title>ASL | SALE ACTIViTY</title>
      </Head>
      <SaleActivity />
    </>
  );
}

export default withAuthentication(SaleActivityPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'saleActivity']);
