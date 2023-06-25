import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import ContainerPage from '@/components/container-page';

function Container() {
  return (
    <>
      <Head>
        <title>ASL | CONTAINER</title>
      </Head>
      <ContainerPage />
    </>
  );
}

export default withAuthentication(Container);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'container']);
