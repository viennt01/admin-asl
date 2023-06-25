import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import UnitPage from '@/components/unit-page';

function Unit() {
  return (
    <>
      <Head>
        <title>ASL | UNIT</title>
      </Head>
      <UnitPage />
    </>
  );
}

export default withAuthentication(Unit);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'unit']);
