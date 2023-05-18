import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditContainer from '@/components/container-page/container-edit';

function CustomerEditPage() {
  return (
    <>
      <Head>
        <title>GLS | Container Edit</title>
      </Head>
      <EditContainer />
    </>
  );
}

export default withAuthentication(CustomerEditPage);
