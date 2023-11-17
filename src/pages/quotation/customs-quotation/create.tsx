import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import CreateCustomQuotation from '@/components/menu-item/quotation/custom/create';

function CreateCustomsQuotationPage() {
  return (
    <>
      <Head>
        <title>ASL | CREATE CUSTOMS QUOTATION</title>
      </Head>
      <CreateCustomQuotation />
    </>
  );
}

export default withAuthentication(CreateCustomsQuotationPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'customsQuotation']);
