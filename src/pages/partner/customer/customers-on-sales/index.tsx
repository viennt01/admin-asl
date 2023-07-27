import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import CustomerOnSalesPage from '@/components/customer-on-sales-page';

function CustomerOnSales() {
  return (
    <>
      <Head>
        <title>ASL | CUSTOMERS ARE ON SALES</title>
      </Head>
      <CustomerOnSalesPage />
    </>
  );
}

export default withAuthentication(CustomerOnSales);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'customerOnSales']);
