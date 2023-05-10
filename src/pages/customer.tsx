import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import CustomerPage from '@/components/customer-page';

function Customer() {
  return (
    <>
      <Head>
        <title>GLS | CUSTOMER</title>
      </Head>
      <CustomerPage />
    </>
  );
}

export default withAuthentication(Customer);
