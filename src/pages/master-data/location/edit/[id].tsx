import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditLocation from '@/components/location-page/location-edit';

function CustomerEditPage() {
  return (
    <>
      <Head>
        <title>GLS | LOCATION Edit</title>
      </Head>
      <EditLocation />
    </>
  );
}

export default withAuthentication(CustomerEditPage);
