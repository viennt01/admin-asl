import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import TypeFeePage from '@/components/menu-item/master-data/fee-catalog/type-fee';

function TypeFee() {
  return (
    <>
      <Head>
        <title>ASL | TYPE FEE</title>
      </Head>
      <TypeFeePage />
    </>
  );
}

export default withAuthentication(TypeFee);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'type-fee']);
