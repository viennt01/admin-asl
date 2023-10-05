import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';

function SeaQuotation() {
  return (
    <>
      <Head>
        <title>ASL | CUSTOMS QUOTATION</title>
      </Head>
      <ComingSoon />
    </>
  );
}

export default withAuthentication(SeaQuotation);
import { getStatic } from '@/lib/getStaticProps';
import ComingSoon from '@/components/coming-soon';
export const getStaticProps = getStatic(['common', 'seaQuotation']);
