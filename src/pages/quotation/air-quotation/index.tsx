import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';

function AirQuotation() {
  return (
    <>
      <Head>
        <title>ASL | AIR QUOTATION</title>
      </Head>
      <AirQuotationPage />
    </>
  );
}

export default withAuthentication(AirQuotation);
import { getStatic } from '@/lib/getStaticProps';
import AirQuotationPage from '@/components/menu-item/quotation/air';
export const getStaticProps = getStatic(['common', 'airQuotation']);
