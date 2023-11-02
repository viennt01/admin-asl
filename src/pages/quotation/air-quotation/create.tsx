import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
// import CreateSeaQuotation from '@/components/menu-item/quotation/sea/create';

function CreateSeaQuotationPage() {
  return (
    <>
      <Head>
        <title>ASL | CREATE SEA QUOTATION</title>
      </Head>
      {/* <CreateSeaQuotation /> */}
    </>
  );
}

export default withAuthentication(CreateSeaQuotationPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'seaQuotation']);
