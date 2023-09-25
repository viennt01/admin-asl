import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';

function CreateFeePage() {
  return (
    <>
      <Head>
        <title>ASL | CREATE FEE</title>
      </Head>
      <CreateFee />
    </>
  );
}

export default withAuthentication(CreateFeePage);
import { getStatic } from '@/lib/getStaticProps';
import CreateFee from '@/components/fee-page/create';
export const getStaticProps = getStatic(['common', 'fee']);
