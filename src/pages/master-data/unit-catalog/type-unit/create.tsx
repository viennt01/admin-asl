import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import CreateTypeUnit from '@/components/menu-item/master-data/unit-catalog/type-unit/create';

function CreateUnitPage() {
  return (
    <>
      <Head>
        <title>ASL | CREATE TYPE UNIT</title>
      </Head>
      <CreateTypeUnit />
    </>
  );
}

export default withAuthentication(CreateUnitPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'typeOfUnit']);
