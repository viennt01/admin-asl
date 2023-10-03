import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';

function CreateFeeGroupPage() {
  return (
    <>
      <Head>
        <title>ASL | CREATE FEE GROUP</title>
      </Head>
      <CreateFeeGroup />
    </>
  );
}

export default withAuthentication(CreateFeeGroupPage);
import { getStatic } from '@/lib/getStaticProps';
import CreateFeeGroup from '@/components/fee-group-page/create';
export const getStaticProps = getStatic(['common', 'FeeGroup']);