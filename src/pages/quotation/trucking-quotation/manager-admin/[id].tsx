import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import ManagerTruckingQuotation from '@/components/menu-item/pricing/pricing/manager';

function TruckingQuotationManagerPage() {
  return (
    <>
      <Head>
        <title>ASL | TRUCKING QUOTATION MANAGER</title>
      </Head>
      <ManagerTruckingQuotation />
    </>
  );
}

export default withAuthentication(TruckingQuotationManagerPage);
import { getStatic } from '@/lib/getStaticProps';
export const getStaticProps = getStatic(['common', 'truckingQuotation']);
export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};
