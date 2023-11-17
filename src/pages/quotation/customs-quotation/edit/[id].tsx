import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import EditCustomQuotation from '@/components/menu-item/quotation/custom/edit';

function CustomsQuotationEditPage() {
  return (
    <>
      <Head>
        <title>ASL | CUSTOM QUOTATION EDIT</title>
      </Head>
      <EditCustomQuotation />
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
