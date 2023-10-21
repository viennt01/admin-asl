import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import FeeGroupPage from '@/components/menu-item/master-data/fee-group';

function FeeGroup() {
  return (
    <>
      <Head>
        <title>ASL | FEE GROUP</title>
      </Head>
      <FeeGroupPage />
    </>
  );
}

export default withAuthentication(FeeGroup);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'feeGroup']);
