import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import FeePage from '@/components/menu-item/master-data/fee-catalog/fee';

function Fee() {
  return (
    <>
      <Head>
        <title>ASL | FEE</title>
      </Head>
      <FeePage />
    </>
  );
}

export default withAuthentication(Fee);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'fee']);
