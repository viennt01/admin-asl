import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import CreateTypeFee from '@/components/menu-item/master-data/fee-catalog/type-fee/create';

function CreateTypeFeePage() {
  return (
    <>
      <Head>
        <title>ASL | CREATE TYPE FEE</title>
      </Head>
      <CreateTypeFee />
    </>
  );
}

export default withAuthentication(CreateTypeFeePage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'type-fee']);
