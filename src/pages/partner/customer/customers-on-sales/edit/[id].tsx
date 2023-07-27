import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditCustomerOnSales from '@/components/customer-on-sales-page/customer-on-sales-edit';

function PotentialCustomerEditPage() {
  return (
    <>
      <Head>
        <title>ASL | CUSTOMERS ARE ON SALES EDIT</title>
      </Head>
      <EditCustomerOnSales />
    </>
  );
}

export default withAuthentication(PotentialCustomerEditPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic([
  'common',
  'customerOnSales',
  'contactInfo',
  'booking',
  'invoice',
]);
export const getStaticPaths = async ({ locales }: { locales: [] }) => {
  const ids: string[] = [];
  const paths = ids.map(() =>
    locales.map(() => ({
      params: {},
    }))
  );
  return {
    paths,
    fallback: true,
  };
};
