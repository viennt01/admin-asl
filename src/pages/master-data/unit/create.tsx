import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import CreateUnit from '@/components/menu-item/master-data/unit/create';

function CreateUnitPage() {
  return (
    <>
      <Head>
        <title>ASL | CREATE UNIT</title>
      </Head>
      <CreateUnit />
    </>
  );
}

export default withAuthentication(CreateUnitPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'unit']);
