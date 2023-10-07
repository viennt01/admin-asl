import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditCustomsQuotation from '@/components/menu-item/quotation/customs/edit';

function CustomsQuotationEditPage() {
  return (
    <>
      <Head>
        <title>ASL | CUSTOM QUOTATION EDIT</title>
      </Head>
      <EditCustomsQuotation />
    </>
  );
}

export default withAuthentication(CustomsQuotationEditPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'customsQuotation']);
export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};
