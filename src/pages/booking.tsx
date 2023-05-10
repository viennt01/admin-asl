import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import ContainerPage from '@/components/container-page';

function Container() {
  return (
    <>
      <Head>
        <title>GLS | BOOKING</title>
      </Head>
      <ContainerPage />
    </>
  );
}

export default withAuthentication(Container);
