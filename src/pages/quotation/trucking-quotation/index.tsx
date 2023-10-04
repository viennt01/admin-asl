import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import TruckingQuotationPage from '@/components/trucking-quotation-page';

function TruckingQuotation() {
  return (
    <>
      <Head>
        <title>ASL | TRUCKING QUOTATION</title>
      </Head>
      <TruckingQuotationPage />
    </>
  );
}

export default withAuthentication(TruckingQuotation);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'truckingQuotation']);
