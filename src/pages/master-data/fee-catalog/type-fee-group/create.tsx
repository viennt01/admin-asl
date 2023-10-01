import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';

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
import CreateTypeFeeGroup from '@/components/fee-group-page/create';
export const getStaticProps = getStatic(['common', 'typeFeeGroup']);
