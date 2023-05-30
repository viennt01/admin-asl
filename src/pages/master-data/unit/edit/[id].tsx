import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditUnit from '@/components/unit-page/unit-edit';

function CustomerEditPage() {
  return (
    <>
      <Head>
        <title>GLS | Unit Edit</title>
      </Head>
      <EditUnit />
    </>
  );
}

export default withAuthentication(CustomerEditPage);
