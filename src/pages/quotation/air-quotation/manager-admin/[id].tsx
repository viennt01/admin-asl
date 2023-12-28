import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import ManagerAirQuotation from '@/components/menu-item/quotation/air/manager';

function SeaQuotationManagerPage() {
  return (
    <>
      <Head>
        <title>ASL | SEA QUOTATION MANAGER</title>
      </Head>
      <ManagerAirQuotation />
    </>
  );
}

export default withAuthentication(SeaQuotationManagerPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'airQuotation']);
export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};
