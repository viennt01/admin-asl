import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import ManagerCustomQuotation from '@/components/menu-item/pricing/sea/manager';

function CustomQuotationManagerPage() {
  return (
    <>
      <Head>
        <title>ASL | CUSTOM QUOTATION MANAGER</title>
      </Head>
      <ManagerCustomQuotation />
    </>
  );
}

export default withAuthentication(CustomQuotationManagerPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'customQuotation']);
export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};
