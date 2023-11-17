import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import ManagerCustomsQuotation from '@/components/menu-item/quotation/custom/manager';

function CustomQuotationManagerPage() {
  return (
    <>
      <Head>
        <title>ASL | CUSTOM QUOTATION MANAGER</title>
      </Head>
      <ManagerCustomsQuotation />
    </>
  );
}

export default withAuthentication(CustomQuotationManagerPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'customsQuotation']);
export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};
