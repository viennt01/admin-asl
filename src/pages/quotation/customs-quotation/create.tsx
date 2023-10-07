import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import CreateCustomsQuotation from '@/components/menu-item/quotation/customs/create';

function CreateCustomsQuotationPage() {
  return (
    <>
      <Head>
        <title>ASL | CREATE CUSTOM QUOTATION</title>
      </Head>
      <CreateCustomsQuotation />
    </>
  );
}

export default withAuthentication(CreateCustomsQuotationPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'customsQuotation']);
