import Head from 'next/head';
import withAuthentication from '@/hook/useAuthentication';
import ManagerTruckQuotation from '@/components/menu-item/quotation/trucking/manager';

function TruckingQuotationManagerPage() {
  return (
    <>
      <Head>
        <title>ASL | TRUCKING QUOTATION MANAGER</title>
      </Head>
      <ManagerTruckQuotation />
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
