import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import PotentialCustomerPage from '@/components/potential-customer-page';

function PotentialCustomer() {
  return (
    <>
      <Head>
        <title>ASL | PROTENTIAL CUSTOMER</title>
      </Head>
      <PotentialCustomerPage />
    </>
  );
}

export default withAuthentication(PotentialCustomer);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'potentialCustomer']);
