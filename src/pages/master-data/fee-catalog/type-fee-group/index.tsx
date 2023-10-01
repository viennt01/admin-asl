import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import TypeFeeGroupPage from '@/components/type-fee-group-page';

function TypeFeeGroup() {
  return (
    <>
      <Head>
        <title>ASL | TYPE OF FEE GROUP</title>
      </Head>
      <TypeFeeGroupPage />
    </>
  );
}

export default withAuthentication(TypeFeeGroup);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'typeFeeGroup']);
