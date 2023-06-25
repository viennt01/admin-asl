import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import PortPage from '@/components/port-page';

function Port() {
  return (
    <>
      <Head>
        <title>ASL | PORT</title>
      </Head>
      <PortPage />
    </>
  );
}

export default withAuthentication(Port);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'port']);
