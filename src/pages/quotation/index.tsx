import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import QuotationPage from '@/components/quotation-page';

function Quotation() {
  return (
    <>
      <Head>
        <title>ASL | QUOTATION</title>
      </Head>
      <QuotationPage />
    </>
  );
}

export default withAuthentication(Quotation);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'quotation']);
