import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import CreateTypeFeeGroup from '@/components/menu-item/master-data/fee-catalog/type-fee-group/create';

function CreateTypeFeeGroupPage() {
  return (
    <>
      <Head>
        <title>ASL | CREATE TYPE OF FEE GROUP</title>
      </Head>
      <CreateTypeFeeGroup />
    </>
  );
}

export default withAuthentication(CreateTypeFeeGroupPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'typeFeeGroup']);
