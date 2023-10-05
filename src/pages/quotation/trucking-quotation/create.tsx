import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import CreateTruckingQuotation from '@/components/menu-item/quotation/trucking/create';

function CreateTruckingQuotationPage() {
  return (
    <>
      <Head>
        <title>ASL | CREATE TRUCKING QUOTATION</title>
      </Head>
      <CreateTruckingQuotation />
    </>
  );
}

export default withAuthentication(CreateTruckingQuotationPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'truckingQuotation']);
