import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import CreatePort from '@/components/port-page/create-port';

function CreatePortPage() {
  return (
    <>
      <Head>
        <title>ASL | CREATE PORT</title>
      </Head>
      <CreatePort />
    </>
  );
}

export default withAuthentication(CreatePortPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'port']);
