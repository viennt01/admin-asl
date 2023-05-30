import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditCustomer from '@/components/customer-page/customer-edit';

function CustomerEditPage() {
  return (
    <>
      <Head>
        <title>GLS | LOCATION Edit</title>
      </Head>
      <EditCustomer />
    </>
  );
}

export default withAuthentication(CustomerEditPage);
