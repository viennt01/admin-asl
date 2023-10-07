import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import ManagerSeaQuotation from '@/components/menu-item/pricing/sea/manager';

function SeaQuotationManagerPage() {
  return (
    <>
      <Head>
        <title>ASL | SEA QUOTATION MANAGER</title>
      </Head>
      <ManagerSeaQuotation />
    </>
  );
}

export default withAuthentication(SeaQuotationManagerPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'seaQuotation']);
export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};
