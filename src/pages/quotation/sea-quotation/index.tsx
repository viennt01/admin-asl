import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import SeaQuotationPage from '@/components/sea-quotation-page';

function SeaQuotation() {
  return (
    <>
      <Head>
        <title>ASL | SEA QUOTATION</title>
      </Head>
      <SeaQuotationPage />
    </>
  );
}

export default withAuthentication(SeaQuotation);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'seaQuotation']);
