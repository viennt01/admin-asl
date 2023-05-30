import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditSupplier from '@/components/supplier-page/supplier-edit';

function CustomerEditPage() {
  return (
    <>
      <Head>
        <title>GLS | SUPPLIER Edit</title>
      </Head>
      <EditSupplier />
    </>
  );
}

export default withAuthentication(CustomerEditPage);
