import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import CreateAirQuotation from '@/components/menu-item/quotation/air/create';

function CreateSeaQuotationPage() {
  return (
    <>
      <Head>
        <title>ASL | CREATE SEA QUOTATION</title>
      </Head>
      <CreateAirQuotation />
    </>
  );
}

export default withAuthentication(CreateSeaQuotationPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'airQuotation']);
