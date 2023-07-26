import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditOfficialCustomer from '@/components/official-customer-page/official-customer-edit';

function OfficialCustomerEditPage() {
  return (
    <>
      <Head>
        <title>ASL | OFFICIAL CUSTOMER EDIT</title>
      </Head>
      <EditOfficialCustomer />
    </>
  );
}

export default withAuthentication(OfficialCustomerEditPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic([
  'common',
  'officialCustomer',
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
