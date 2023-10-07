import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import CustomsQuotationPage from '@/components/menu-item/quotation/customs';

function CustomsQuotation() {
  return (
    <>
      <Head>
        <title>ASL | CUSTOMS QUOTATION</title>
      </Head>
      <CustomsQuotationPage />
    </>
  );
}

export default withAuthentication(CustomsQuotation);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'customsQuotation']);
