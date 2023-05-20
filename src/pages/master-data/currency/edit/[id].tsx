import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditCurrency from '@/components/currency-page/currency-edit';

function CustomerEditPage() {
  return (
    <>
      <Head>
        <title>GLS | Currency Edit</title>
      </Head>
      <EditCurrency />
    </>
  );
}

export default withAuthentication(CustomerEditPage);
