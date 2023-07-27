import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import OfficialCustomerPage from '@/components/official-customer-page';

function OfficialCustomer() {
  return (
    <>
      <Head>
        <title>ASL | OFFICIAL CUSTOMER</title>
      </Head>
      <OfficialCustomerPage />
    </>
  );
}

export default withAuthentication(OfficialCustomer);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'officialCustomer']);
