import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditPort from '@/components/port-page/port-edit';

function CustomerEditPage() {
  return (
    <>
      <Head>
        <title>GLS | Port Edit</title>
      </Head>
      <EditPort />
    </>
  );
}

export default withAuthentication(CustomerEditPage);
