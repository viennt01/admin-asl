import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditDepot from '@/components/depot-page/depot-edit';

function CustomerEditPage() {
  return (
    <>
      <Head>
        <title>GLS | Depot Edit</title>
      </Head>
      <EditDepot />
    </>
  );
}

export default withAuthentication(CustomerEditPage);
