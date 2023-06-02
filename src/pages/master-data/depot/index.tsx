import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import DepotPage from '@/components/depot-page';

function Depot() {
  return (
    <>
      <Head>
        <title>GLS | DEPOT</title>
      </Head>
      <DepotPage />
    </>
  );
}

export default withAuthentication(Depot);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'depot']);
