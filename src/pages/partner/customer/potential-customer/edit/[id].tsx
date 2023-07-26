import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditPotentialCustomer from '@/components/potential-customer-page/potential-customer-edit';

function PotentialCustomerEditPage() {
  return (
    <>
      <Head>
        <title>ASL | POTENTIAL CUSTOMER EDIT</title>
      </Head>
      <EditPotentialCustomer />
    </>
  );
}

export default withAuthentication(PotentialCustomerEditPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic([
  'common',
  'potentialCustomer',
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
