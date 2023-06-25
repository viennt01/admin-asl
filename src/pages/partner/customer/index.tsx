import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import CustomerPage from '@/components/customer-page';

function Customer() {
  return (
    <>
      <Head>
        <title>ASL | CUSTOMER</title>
      </Head>
      <CustomerPage />
    </>
  );
}

export default withAuthentication(Customer);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'customer']);
